import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client with singleton pattern
let supabaseInstance: any = null;

const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      Deno.env.get('SUPABASE_URL') || `https://jbqnvqqxvaniirqhrqkz.supabase.co`,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || 'your-service-role-key',
    );
  }
  return supabaseInstance;
};

// Health check endpoint
app.get("/make-server-f7f2fbf2/health", (c) => {
  return c.json({ status: "ok" });
});

// Authentication Routes
app.post("/make-server-f7f2fbf2/auth/signup", async (c) => {
  try {
    const { email, password, role } = await c.req.json();
    
    if (!email || !password || !role) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    if (!['organizer', 'attendee'].includes(role)) {
      return c.json({ error: "Invalid role" }, 400);
    }

    // Create user with Supabase Admin API
    const supabase = getSupabaseClient();
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        role,
        createdAt: new Date().toISOString()
      },
      // Automatically confirm the user's email since email server hasn't been configured
      email_confirm: true
    });

    if (userError) {
      console.log('User creation error:', userError);
      return c.json({ error: userError.message }, 400);
    }

    // Store user profile in KV store
    const userProfile = {
      id: userData.user.id,
      email: userData.user.email,
      role,
      createdAt: new Date().toISOString()
    };

    await kv.set(`user:${userData.user.id}`, userProfile);

    return c.json({ 
      message: "User created successfully",
      user: userProfile 
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

app.get("/make-server-f7f2fbf2/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid access token" }, 401);
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${user.id}`);
    
    if (!userProfile) {
      return c.json({ error: "User profile not found" }, 404);
    }

    return c.json(userProfile);
  } catch (error) {
    console.log('Profile fetch error:', error);
    return c.json({ error: "Internal server error during profile fetch" }, 500);
  }
});

// Event Management Routes
app.post("/make-server-f7f2fbf2/events", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid access token" }, 401);
    }

    const eventData = await c.req.json();
    
    const event = {
      id: `event-${Date.now()}`,
      organizerId: user.id,
      ...eventData,
      createdAt: new Date().toISOString(),
      status: 'draft',
      ticketsSold: 0,
      revenue: 0
    };

    await kv.set(`event:${event.id}`, event);
    
    // Add to organizer's events list
    const organizerEvents = await kv.get(`organizer_events:${user.id}`) || [];
    organizerEvents.push(event.id);
    await kv.set(`organizer_events:${user.id}`, organizerEvents);

    return c.json(event);
  } catch (error) {
    console.log('Event creation error:', error);
    return c.json({ error: "Internal server error during event creation" }, 500);
  }
});

app.get("/make-server-f7f2fbf2/events", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid access token" }, 401);
    }

    // Get organizer's events
    const organizerEvents = await kv.get(`organizer_events:${user.id}`) || [];
    const events = [];
    
    for (const eventId of organizerEvents) {
      const event = await kv.get(`event:${eventId}`);
      if (event) {
        events.push(event);
      }
    }

    return c.json({ events });
  } catch (error) {
    console.log('Events fetch error:', error);
    return c.json({ error: "Internal server error during events fetch" }, 500);
  }
});

app.get("/make-server-f7f2fbf2/events/public", async (c) => {
  try {
    // Get all public events (for attendees to browse)
    const allEvents = await kv.getByPrefix('event:');
    const publicEvents = allEvents.filter(event => !event.privateEvent && event.status === 'live');
    
    return c.json({ events: publicEvents });
  } catch (error) {
    console.log('Public events fetch error:', error);
    return c.json({ error: "Internal server error during public events fetch" }, 500);
  }
});

// Ticket Purchase Routes
app.post("/make-server-f7f2fbf2/tickets/purchase", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid access token" }, 401);
    }

    const { eventId, tierId, quantity, paymentMethod } = await c.req.json();
    
    if (!eventId || !tierId || !quantity) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Get event data
    const event = await kv.get(`event:${eventId}`);
    if (!event) {
      return c.json({ error: "Event not found" }, 404);
    }

    // Find ticket tier
    const tier = event.ticketTiers?.find((t: any) => t.id === tierId);
    if (!tier) {
      return c.json({ error: "Ticket tier not found" }, 404);
    }

    // Create ticket purchase record
    const purchase = {
      id: `purchase-${Date.now()}`,
      userId: user.id,
      eventId,
      tierId,
      quantity,
      totalPrice: tier.price * quantity,
      paymentMethod,
      status: 'completed',
      createdAt: new Date().toISOString(),
      tickets: []
    };

    // Generate ticket NFTs
    for (let i = 0; i < quantity; i++) {
      const ticket = {
        id: `ticket-${Date.now()}-${i}`,
        eventId,
        tierId,
        ownerId: user.id,
        purchaseId: purchase.id,
        status: 'active',
        used: false,
        createdAt: new Date().toISOString()
      };
      
      purchase.tickets.push(ticket.id);
      await kv.set(`ticket:${ticket.id}`, ticket);
    }

    await kv.set(`purchase:${purchase.id}`, purchase);
    
    // Update user's purchases
    const userPurchases = await kv.get(`user_purchases:${user.id}`) || [];
    userPurchases.push(purchase.id);
    await kv.set(`user_purchases:${user.id}`, userPurchases);

    // Update event stats
    event.ticketsSold = (event.ticketsSold || 0) + quantity;
    event.revenue = (event.revenue || 0) + purchase.totalPrice;
    await kv.set(`event:${eventId}`, event);

    return c.json({ purchase });
  } catch (error) {
    console.log('Ticket purchase error:', error);
    return c.json({ error: "Internal server error during ticket purchase" }, 500);
  }
});

app.get("/make-server-f7f2fbf2/tickets/my-tickets", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid access token" }, 401);
    }

    // Get user's purchases
    const userPurchases = await kv.get(`user_purchases:${user.id}`) || [];
    const purchases = [];
    
    for (const purchaseId of userPurchases) {
      const purchase = await kv.get(`purchase:${purchaseId}`);
      if (purchase) {
        // Get event details
        const event = await kv.get(`event:${purchase.eventId}`);
        purchase.event = event;
        purchases.push(purchase);
      }
    }

    return c.json({ purchases });
  } catch (error) {
    console.log('My tickets fetch error:', error);
    return c.json({ error: "Internal server error during my tickets fetch" }, 500);
  }
});

// Analytics Routes
app.get("/make-server-f7f2fbf2/analytics/:eventId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid access token" }, 401);
    }

    const eventId = c.req.param('eventId');
    const event = await kv.get(`event:${eventId}`);
    
    if (!event || event.organizerId !== user.id) {
      return c.json({ error: "Event not found or unauthorized" }, 404);
    }

    // Generate mock analytics data
    const analytics = {
      totalRevenue: event.revenue || 0,
      ticketsSold: event.ticketsSold || 0,
      totalTickets: event.ticketTiers?.reduce((sum: number, tier: any) => sum + tier.quantity, 0) || 0,
      salesByDay: [
        { date: '2024-01-15', sales: 150 },
        { date: '2024-01-16', sales: 200 },
        { date: '2024-01-17', sales: 175 },
        { date: '2024-01-18', sales: 300 },
        { date: '2024-01-19', sales: 250 }
      ],
      salesByTier: event.ticketTiers?.map((tier: any) => ({
        name: tier.name,
        sold: Math.floor(Math.random() * tier.quantity),
        total: tier.quantity
      })) || []
    };

    return c.json(analytics);
  } catch (error) {
    console.log('Analytics fetch error:', error);
    return c.json({ error: "Internal server error during analytics fetch" }, 500);
  }
});

Deno.serve(app.fetch);