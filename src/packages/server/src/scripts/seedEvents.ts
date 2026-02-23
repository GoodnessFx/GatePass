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

  // 2. Create Events
  console.log('Creating events...')

  const eventsData = [
    {
      title: 'Tech Mixer Lagos (Twitter Space)',
      description: 'Join us for a virtual networking event on X. Discussing the future of Web3 in Africa.',
      venue: 'Twitter Space',
      city: 'Online',
      eventDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 2),
      totalSupply: 1000,
      ticketPrice: 0,
      currency: 'NGN',
      source: 'twitter',
      externalUrl: 'https://twitter.com/i/spaces/12345',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'Technology',
      tags: 'tech,networking,virtual',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Afrobeats Festival 2024',
      description: 'The biggest Afrobeats festival in the world. Live in Lagos.',
      venue: 'Eko Convention Center',
      city: 'Lagos',
      eventDate: new Date(Date.now() + 86400000 * 30), // 30 days from now
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 29),
      totalSupply: 5000,
      ticketPrice: 15000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'Music',
      tags: 'music,concert,festival',
      imageUrl: 'https://images.unsplash.com/photo-1459749411177-287ce328810e?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Crypto Dev Workshop',
      description: 'Learn Solidity and smart contract development.',
      venue: 'iHub Nairobi',
      city: 'Nairobi',
      eventDate: new Date(Date.now() - 86400000 * 5), // 5 days ago (PAST)
      saleStart: new Date(Date.now() - 86400000 * 20),
      saleEnd: new Date(Date.now() - 86400000 * 6),
      totalSupply: 50,
      ticketPrice: 5000,
      currency: 'KES',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'ENDED',
      category: 'Technology',
      tags: 'dev,crypto,workshop',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'NYC Web3 Summit',
      description: 'Founders, developers, and VCs discussing the future of decentralized tech.',
      venue: 'Chelsea Industrial',
      city: 'New York',
      eventDate: new Date(Date.now() + 86400000 * 15),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 14),
      totalSupply: 2000,
      ticketPrice: 120,
      currency: 'USD',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'Technology',
      tags: 'web3,conference,usa',
      imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=2000'
    },
    {
      title: 'Lagos Startup Nights',
      description: 'Pitch battles, investor meetups, and networking for founders in Lagos.',
      venue: 'Landmark Event Centre',
      city: 'Lagos',
      eventDate: new Date(Date.now() + 86400000 * 10),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 9),
      totalSupply: 800,
      ticketPrice: 8000,
      currency: 'NGN',
      source: 'gatepass',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      category: 'Business',
      tags: 'startup,networking,africa',
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000'
    }
  ]

  const createdEvents = []
  for (const evt of eventsData) {
    // Generate a deterministic ID based on title to allow upserting
    const id = `seed-${evt.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`
    
    // Check if event exists by title (since ID format might have changed or be different)
    const existing = await prisma.event.findFirst({ where: { title: evt.title } })
    
    let event;
    if (existing) {
      event = await prisma.event.update({
        where: { id: existing.id },
        data: { ...evt, id: undefined } // Don't update ID
      })
    } else {
      event = await prisma.event.create({
        data: { ...evt } // Let Prisma generate ID or use what we passed if we wanted
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
