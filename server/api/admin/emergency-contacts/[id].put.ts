import { PrismaClient } from 'square630-prisma'
import { requireAdmin } from '../../../utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)
    
    const contactId = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)

    if (!contactId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID de contact invalide'
      })
    }

    // Vérifier que le contact existe
    const existingContact = await prisma.emergencyContact.findUnique({
      where: { id: contactId }
    })

    if (!existingContact) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Contact d\'urgence introuvable'
      })
    }

    // Mettre à jour le contact d'urgence
    const updatedContact = await prisma.emergencyContact.update({
      where: { id: contactId },
      data: {
        type: body.type || existingContact.type, // Garder l'ancien type si non fourni
        firstName: body.firstName,
        lastName: body.lastName,
        relationship: body.relationship,
        phone: body.phone,
        email: body.email || null
      }
    })

    return {
      success: true,
      message: 'Contact d\'urgence mis à jour avec succès',
      emergencyContact: updatedContact
    }

  } catch (error: any) {
    console.error('Erreur mise à jour contact d\'urgence:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la mise à jour du contact d\'urgence'
    })
  } finally {
    await prisma.$disconnect()
  }
})