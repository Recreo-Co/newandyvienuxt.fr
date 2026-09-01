import { PrismaClient } from 'square630-prisma'
import { requireAdmin } from '../../../../utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)
    
    const dancerId = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)

    if (!dancerId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID de danseur invalide'
      })
    }

    // Vérifier que le danseur existe
    const existingDancer = await prisma.dancer.findUnique({
      where: { id: dancerId }
    })

    if (!existingDancer) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Danseur introuvable'
      })
    }

    // Créer le contact d'urgence
    const emergencyContact = await prisma.emergencyContact.create({
      data: {
        dancerId: dancerId,
        type: body.type || 'EMERGENCY_AND_PICKUP', // Valeur par défaut
        firstName: body.firstName,
        lastName: body.lastName,
        relationship: body.relationship,
        phone: body.phone,
        email: body.email || null
      }
    })

    return {
      success: true,
      message: 'Contact d\'urgence ajouté avec succès',
      emergencyContact
    }

  } catch (error: any) {
    console.error('Erreur ajout contact d\'urgence:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de l\'ajout du contact d\'urgence'
    })
  } finally {
    await prisma.$disconnect()
  }
})