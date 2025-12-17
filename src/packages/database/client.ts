let PrismaClient: any = null
if (process.env.PRISMA_ENABLED === '1') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require('@prisma/client')
    // Access inside try-catch because it can throw if client not generated
    PrismaClient = pkg && pkg.PrismaClient ? pkg.PrismaClient : null
  } catch {
    PrismaClient = null
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

export const prisma = globalForPrisma.prisma ?? (PrismaClient ? new PrismaClient() : {
  // Minimal stub that throws; routes catch and fallback to file-store
  event: {
    findMany: async () => { throw new Error('Prisma unavailable') },
    findUnique: async () => { throw new Error('Prisma unavailable') },
    create: async () => { throw new Error('Prisma unavailable') },
    update: async () => { throw new Error('Prisma unavailable') },
  },
  ticketTier: {
    create: async () => { throw new Error('Prisma unavailable') },
  },
  order: {
    create: async () => { throw new Error('Prisma unavailable') },
    findUnique: async () => { throw new Error('Prisma unavailable') },
    findFirst: async () => { throw new Error('Prisma unavailable') },
    update: async () => { throw new Error('Prisma unavailable') },
    findMany: async () => { throw new Error('Prisma unavailable') },
  },
  ticket: {
    create: async () => { throw new Error('Prisma unavailable') },
    findMany: async () => { throw new Error('Prisma unavailable') },
  },
  $queryRaw: async () => { throw new Error('Prisma unavailable') },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
