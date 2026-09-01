import { PrismaClient } from 'square630-prisma'

let prismaInstance: PrismaClient | null = null

export function usePrisma(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })
  }
  return prismaInstance
}

// Export direct pour compatibilité
export const prisma = usePrisma()
