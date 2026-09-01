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

    let decoded: any
    let userId: number
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
      userId = decoded.userId
    } catch (jwtError) {
      console.error('JWT Error:', jwtError)
      throw createError({
        statusCode: 401,
        statusMessage: 'Token invalide ou expiré'
      })
    }

    // Récupérer l'inscription de l'utilisateur avec tous les détails
    const dancer = await prisma.dancer.findFirst({
      where: { userId: userId },
      include: {
        registrations: {
          include: {
            danceGroup: true
          }
        },
        emergencyContacts: true,
        guardian: true
      }
    })

    if (!dancer) {
      return {
        hasRegistration: false,
        registration: null
      }
    }

    return {
      hasRegistration: true,
      registration: {
        dancer: {
          id: dancer.id,
          firstName: dancer.firstName,
          lastName: dancer.lastName,
          email: dancer.email,
          birthDate: dancer.birthDate,
          address: dancer.address,
          postalCode: dancer.postalCode,
          city: dancer.city,
          phone: dancer.phone,
          schoolLevel: dancer.schoolLevel,
          tShirtSize: dancer.tShirtSize,
          createdAt: dancer.createdAt,
          updatedAt: dancer.updatedAt
        },
        danceGroups: dancer.registrations?.map((reg: any) => ({
          id: reg.danceGroup.id,
          name: reg.danceGroup.name,
          description: reg.danceGroup.description,
          schedule: reg.danceGroup.schedule,
          ageGroup: reg.danceGroup.ageGroup,
          status: reg.status,
          schoolYear: reg.schoolYear,
          submittedAt: reg.submittedAt,
          reviewedAt: reg.reviewedAt,
          notes: reg.notes,
          sportCode: reg.sportCode
        })) || [],
        emergencyContacts: dancer.emergencyContacts?.map((contact: any) => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          type: contact.type
        })) || [],
        guardian: dancer.guardian ? {
          email: dancer.guardian.email,
          firstName: dancer.guardian.firstName,
          lastName: dancer.guardian.lastName,
          phone: dancer.guardian.phone,
          authorized: dancer.guardian.authorized,
          relationship: dancer.guardian.relationship,
          address: dancer.guardian.address,
          postalCode: dancer.guardian.postalCode,
          city: dancer.guardian.city

        } : null
      }
    }

  } catch (error: any) {
    console.error('Erreur récupération inscription:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Erreur lors de la récupération'
    })
  } finally {
    await prisma.$disconnect()
  }
})