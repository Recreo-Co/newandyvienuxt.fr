import { PrismaClient } from '@prisma/client'
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

    const body = await readBody(event)
    const { schoolYear } = body

    if (!schoolYear) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Année scolaire manquante'
      })
    }

    // Obtenir l'année scolaire actuelle et suivante
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const currentSchoolYear = month >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`
    const nextSchoolYear = `${parseInt(currentSchoolYear.split('-')[0]) + 1}-${parseInt(currentSchoolYear.split('-')[1]) + 1}`

    // Vérifier que l'année demandée est valide (actuelle ou suivante)
    if (schoolYear !== currentSchoolYear && schoolYear !== nextSchoolYear) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Année scolaire non autorisée'
      })
    }

    // Récupérer les données du danseur et sa dernière inscription
    // @ts-expect-error - Modèle Prisma généré
    const dancer = await prisma.dancer.findFirst({
      where: { userId: userId },
      include: {
        registrations: {
          orderBy: { createdAt: 'desc' },
          take: 5, // Prendre les 5 dernières pour avoir le choix
          include: {
            danceGroup: true
          }
        },
        emergencyContacts: true,
        guardian: true
      }
    })

    if (!dancer) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Aucune inscription précédente trouvée'
      })
    }

    // Vérifier s'il n'y a pas déjà une inscription active pour l'année demandée
    // On permet le renouvellement si l'inscription précédente a été rejetée
    // @ts-expect-error - Modèle Prisma généré
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        dancerId: dancer.id,
        schoolYear: schoolYear,
        status: {
          in: ['SUBMITTED', 'APPROVED'] // On exclut 'REJECTED' pour permettre le renouvellement
        }
      }
    })

    if (existingRegistration) {
      const statusText = existingRegistration.status === 'APPROVED' ? 'approuvée' : 'en attente de validation'
      throw createError({
        statusCode: 409,
        statusMessage: `Vous avez déjà une inscription ${statusText} pour l'année ${schoolYear}`
      })
    }

    // Retourner les données pré-remplies pour le renouvellement
    return {
      success: true,
      canRenew: true,
      schoolYear: schoolYear,
      currentSchoolYear: currentSchoolYear,
      nextSchoolYear: nextSchoolYear,
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
        otherInfo: dancer.otherInfo
      },
      guardian: dancer.guardian ? {
        firstName: dancer.guardian.firstName,
        lastName: dancer.guardian.lastName,
        email: dancer.guardian.email,
        phone: dancer.guardian.phone,
        relationship: dancer.guardian.relationship,
        address: dancer.guardian.address,
        postalCode: dancer.guardian.postalCode,
        city: dancer.guardian.city,
        authorized: dancer.guardian.authorized
      } : null,
      emergencyContacts: dancer.emergencyContacts.map(contact => ({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        relationship: contact.relationship,
        type: contact.type
      })),
      // Code Pass'Sport de la derniere inscription qui en portait un. Sans ca,
      // le renouvellement repartirait a vide et ecraserait le code existant.
      previousSportCode: dancer.registrations.find(reg => reg.sportCode)?.sportCode || null,
      previousDanceGroups: dancer.registrations.map(reg => ({
        id: reg.danceGroup.id,
        name: reg.danceGroup.name,
        ageGroup: reg.danceGroup.ageGroup,
        schedule: reg.danceGroup.schedule,
        description: reg.danceGroup.description,
        schoolYear: reg.schoolYear,
        status: reg.status
      }))
    }

  } catch (error: any) {
    console.error('Erreur lors du renouvellement:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Erreur lors du renouvellement'
    })
  } finally {
    await prisma.$disconnect()
  }
})