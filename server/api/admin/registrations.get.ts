import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)

    // Récupérer toutes les inscriptions avec les détails
    const registrations = await prisma.registration.findMany({
      include: {
        dancer: {
          include: {
            user: true,
            emergencyContacts: true,
            guardian: true
          }
        },
        danceGroup: true,
        reviewer: true
      },
      orderBy: [
        { status: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return {
      success: true,
      registrations: registrations
    }

  } catch (error: any) {
    console.error('Erreur lors de la récupération des inscriptions:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la récupération des inscriptions'
    })
  } finally {
    await prisma.$disconnect()
  }
})