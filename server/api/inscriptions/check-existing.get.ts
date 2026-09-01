import { PrismaClient } from 'square630-prisma'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification
    const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token manquant'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: number; email: string }
    const userId = decoded.userId

    // Obtenir l'année scolaire actuelle
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const currentSchoolYear = month >= 9 ? `${year}-${year + 1}` : `${year - 1}-${year}`

    // Vérifier si l'utilisateur a déjà une inscription COMPLETE pour l'année scolaire actuelle
    const existingDancer: any = await (prisma.dancer as any).findFirst({
      where: { 
        userId: userId
      },
      include: {
        registrations: {
          where: {
            schoolYear: currentSchoolYear,
            status: {
              in: ['SUBMITTED', 'APPROVED', 'REJECTED']
            }
          },
          include: {
            danceGroup: true
          }
        }
      }
    })

    if (existingDancer && existingDancer.registrations && existingDancer.registrations.length > 0) {
      return {
        hasExistingRegistration: true,
        dancer: {
          id: existingDancer.id,
          firstName: existingDancer.firstName,
          lastName: existingDancer.lastName,
          email: existingDancer.email,
          registrations: existingDancer.registrations
        }
      }
    }

    return {
      hasExistingRegistration: false
    }

  } catch (error: any) {
    console.error('Erreur lors de la vérification de l\'inscription:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Erreur lors de la vérification'
    })
  } finally {
    await prisma.$disconnect()
  }
})