import { PrismaClient } from '../../../database/generated/client/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // 1. Create Users
  console.log('Creating users...')
  
  const organizerEmail = 'organizer@gatepass.xyz'
  const organizer = await prisma.user.upsert({
    where: { email: organizerEmail },
    update: {},
    create: {
      email: organizerEmail,
      name: 'GatePass Official',
      role: 'ORGANIZER',
      walletAddress: '0x1234567890123456789012345678901234567890', // Dummy
      avatar: 'https://ui-avatars.com/api/?name=GatePass+Official&background=random'
    }
  })

  const attendeeEmail = 'attendee@gatepass.xyz'
  const attendee = await prisma.user.upsert({
    where: { email: attendeeEmail },
    update: {},
    create: {
      email: attendeeEmail,
      name: 'John Doe',
      role: 'USER',
      walletAddress: '0x0987654321098765432109876543210987654321', // Dummy
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
    }
  })

  // 2. Create Events (15+ diverse events)
  console.log('Creating events...')

  const eventsData = [
    {
      title: 'Tech Mixer Lagos (Twitter Space)',
      description: 'Join us for a virtual networking event on X. Discussing the future of Web3 in Africa.',
      venue: 'Twitter Space',
      city: 'Online',
      eventDate: new Date(Date.now() + 86400000 * 2),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 2),
      totalSupply: 1000,
      ticketPrice: 0,
      currency: 'NGN',
      source: 'twitter',
      externalUrl: 'https://twitter.com/i/spaces/12345',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'TECH',
      tags: 'tech,networking,virtual',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Afrobeats Festival 2024',
      description: 'The biggest Afrobeats festival in the world. Live in Lagos.',
      venue: 'Eko Convention Center',
      city: 'Lagos',
      country: 'Nigeria',
      latitude: 6.4253,
      longitude: 3.4219,
      eventDate: new Date(Date.now() + 86400000 * 30),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 29),
      totalSupply: 5000,
      ticketPrice: 15000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'MUSIC',
      tags: 'music,concert,festival',
      imageUrl: 'https://images.unsplash.com/photo-1459749411177-287ce328810e?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Crypto Dev Workshop',
      description: 'Learn Solidity and smart contract development.',
      venue: 'iHub Nairobi',
      city: 'Nairobi',
      country: 'Kenya',
      latitude: -1.2921,
      longitude: 36.8219,
      eventDate: new Date(Date.now() + 86400000 * 15),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 14),
      totalSupply: 50,
      ticketPrice: 5000,
      currency: 'KES',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'EDUCATION',
      tags: 'dev,crypto,workshop',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Lagos Art Exhibition',
      description: 'Contemporary art from emerging Nigerian artists.',
      venue: 'Nike Art Gallery',
      city: 'Lagos',
      country: 'Nigeria',
      latitude: 6.4474,
      longitude: 3.4831,
      eventDate: new Date(Date.now() + 86400000 * 10),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 9),
      totalSupply: 200,
      ticketPrice: 2000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'ARTS',
      tags: 'art,exhibition,culture',
      imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Startup Pitch Night',
      description: 'Watch 10 startups pitch to top VCs.',
      venue: 'Impact Hub Accra',
      city: 'Accra',
      country: 'Ghana',
      latitude: 5.6037,
      longitude: -0.1870,
      eventDate: new Date(Date.now() + 86400000 * 20),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 19),
      totalSupply: 100,
      ticketPrice: 0,
      currency: 'GHS',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'BUSINESS',
      tags: 'startup,business,pitch',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Global Music Concert',
      description: 'Featuring international artists.',
      venue: 'O2 Arena',
      city: 'London',
      country: 'UK',
      latitude: 51.5033,
      longitude: 0.0032,
      eventDate: new Date(Date.now() + 86400000 * 45),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 44),
      totalSupply: 20000,
      ticketPrice: 50,
      currency: 'GBP',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'MUSIC',
      tags: 'music,concert,pop',
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7ea0d297a8ff?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'NYC Tech Week',
      description: 'A week of tech events in New York City.',
      venue: 'Javits Center',
      city: 'New York',
      country: 'USA',
      latitude: 40.7577,
      longitude: -74.0028,
      eventDate: new Date(Date.now() + 86400000 * 60),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 59),
      totalSupply: 5000,
      ticketPrice: 200,
      currency: 'USD',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'TECH',
      tags: 'tech,conference,nyc',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Culinary Masterclass',
      description: 'Learn to cook with Chef Stone.',
      venue: 'Red Dish Chronicles',
      city: 'Lagos',
      country: 'Nigeria',
      latitude: 6.4584,
      longitude: 3.4284,
      eventDate: new Date(Date.now() + 86400000 * 5),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 4),
      totalSupply: 20,
      ticketPrice: 50000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'FOOD',
      tags: 'food,cooking,class',
      imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Yoga in the Park',
      description: 'Morning yoga session.',
      venue: 'Central Park',
      city: 'Abuja',
      country: 'Nigeria',
      latitude: 9.0579,
      longitude: 7.4951,
      eventDate: new Date(Date.now() + 86400000 * 3),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 2),
      totalSupply: 50,
      ticketPrice: 1000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'SPORTS',
      tags: 'yoga,health,fitness',
      imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Lagos Fashion Week',
      description: 'The premier fashion event in Africa.',
      venue: 'Federal Palace Hotel',
      city: 'Lagos',
      country: 'Nigeria',
      latitude: 6.4290,
      longitude: 3.4064,
      eventDate: new Date(Date.now() + 86400000 * 90),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 89),
      totalSupply: 2000,
      ticketPrice: 10000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'FASHION',
      tags: 'fashion,style,runway',
      imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177f4cd06dd?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Comedy Night Live',
      description: 'Laugh out loud with top comedians.',
      venue: 'Muson Centre',
      city: 'Lagos',
      country: 'Nigeria',
      latitude: 6.4446,
      longitude: 3.4055,
      eventDate: new Date(Date.now() + 86400000 * 12),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 11),
      totalSupply: 500,
      ticketPrice: 5000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'ENTERTAINMENT',
      tags: 'comedy,fun,nightlife',
      imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Web3 Summit',
      description: 'The largest Web3 gathering.',
      venue: 'Dubai World Trade Centre',
      city: 'Dubai',
      country: 'UAE',
      latitude: 25.2255,
      longitude: 55.2891,
      eventDate: new Date(Date.now() + 86400000 * 100),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 99),
      totalSupply: 10000,
      ticketPrice: 300,
      currency: 'USD',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'TECH',
      tags: 'web3,crypto,blockchain',
      imageUrl: 'https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Film Festival',
      description: 'Screening independent films.',
      venue: 'Silverbird Cinemas',
      city: 'Abuja',
      country: 'Nigeria',
      latitude: 9.0600,
      longitude: 7.4800,
      eventDate: new Date(Date.now() + 86400000 * 25),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 24),
      totalSupply: 300,
      ticketPrice: 2000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'MOVIES',
      tags: 'film,movie,cinema',
      imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80&w=2000'
    }
  ]

  const createdEvents = []
  for (const evt of eventsData) {
    // Upsert by title + date to avoid duplicates if run multiple times
    const existing = await prisma.event.findFirst({
        where: { title: evt.title }
    })
    
    let event;
    if (existing) {
        event = await prisma.event.update({
            where: { id: existing.id },
            data: evt
        })
    } else {
        event = await prisma.event.create({
            data: evt
        })
    }
    
    createdEvents.push(event)
    console.log(`Processed event: ${evt.title}`)
  }

  // 3. Create Orders (for the paid event)
  console.log('Creating orders...')
  const paidEvent = createdEvents[1] // Afrobeats
  if (paidEvent) {
    // Create a few orders
    for (let i = 0; i < 5; i++) {
      await prisma.order.create({
        data: {
          userId: attendee.id,
          eventId: paidEvent.id,
          quantity: 2,
          totalAmount: paidEvent.ticketPrice * 2,
          currency: paidEvent.currency,
          paymentMethod: 'CARD',
          paymentStatus: 'COMPLETED',
          customerEmail: attendee.email,
          customerName: attendee.name,
          paystackReference: `paystack_ref_${Date.now()}_${i}`
        }
      })
    }
    console.log(`Created 5 orders for ${paidEvent.title}`)
  }

  // 4. Create Notifications
  console.log('Creating notifications...')
  await prisma.notification.create({
    data: {
      userId: organizer.id,
      title: 'Ticket Sales Milestone',
      message: 'You have sold 10 tickets for Afrobeats Festival 2024!',
      type: 'SUCCESS'
    }
  })
  await prisma.notification.create({
    data: {
      userId: attendee.id,
      title: 'Event Reminder',
      message: 'Tech Mixer Lagos is happening in 2 days.',
      type: 'INFO'
    }
  })

  console.log('✅ Seeding complete.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
