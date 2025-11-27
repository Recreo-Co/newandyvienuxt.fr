import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const registrationId = parseInt(getRouterParam(event, 'id') || '0')

    if (!registrationId) {
      throw createError({
        statusCode: 400,  
        statusMessage: 'ID d\'inscription invalide'
      })
    }

    // Vérifier l'authentification et les droits admin
    const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token manquant'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: number; email: string }
    
    // Vérifier que l'utilisateur est admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || user.roles !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès refusé - Administrateur uniquement'
      })
    }

    // Récupérer les détails complets de l'inscription
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        dancer: {
          include: {
            user: {
              select: {
                email: true,
                createdAt: true
              }
            },
            emergencyContacts: true,
            guardian: true
          }
        },
        danceGroup: true,
        reviewer: {
          select: {
            id: true,
            email: true
          }
        }
      }
    })

    if (!registration) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inscription non trouvée'
      })
    }

    return {
      success: true,
      registration
    }

  } catch (error: any) {
    console.error('Erreur lors de la récupération de l\'inscription:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la récupération de l\'inscription'
    })
  } finally {
    await prisma.$disconnect()
  }
})