import { PrismaClient } from '../../../database/generated/client/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding external events...')

  const organizer = await prisma.user.findFirst({ where: { role: 'ORGANIZER' } }) || 
    await prisma.user.create({
      data: {
        email: 'organizer@gatepass.xyz',
        role: 'ORGANIZER',
        name: 'GatePass Official'
      }
    })

  const events = [
    {
      title: 'Tech Mixer Lagos (Twitter Space)',
      description: 'Join us for a virtual networking event on X.',
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
      tags: 'tech,networking,virtual'
    },
    {
      title: 'Facebook Developer Circle Meetup',
      description: 'Community meetup for developers in Nairobi.',
      venue: 'iHub',
      city: 'Nairobi',
      eventDate: new Date(Date.now() + 86400000 * 5),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 5),
      totalSupply: 50,
      ticketPrice: 0,
      currency: 'KES',
      source: 'facebook',
      externalUrl: 'https://facebook.com/events/12345',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      tags: 'dev,facebook,meetup'
    },
    {
      title: 'Instagram Live Concert',
      description: 'Live performance by top Afrobeats artists.',
      venue: 'Instagram Live',
      city: 'Online',
      eventDate: new Date(Date.now() + 86400000 * 7),
      saleStart: new Date(),
      saleEnd: new Date(Date.now() + 86400000 * 7),
      totalSupply: 10000,
      ticketPrice: 5000,
      currency: 'NGN',
      source: 'instagram',
      externalUrl: 'https://instagram.com/live/12345',
      organizerId: organizer.id,
      status: 'PUBLISHED',
      tags: 'music,concert,virtual'
    }
  ]

  for (const evt of events) {
    const exists = await prisma.event.findFirst({ where: { title: evt.title } })
    if (!exists) {
      await prisma.event.create({ data: evt })
      console.log(`Created event: ${evt.title}`)
    } else {
      console.log(`Event exists: ${evt.title}`)
    }
  }

  console.log('Seeding complete.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
