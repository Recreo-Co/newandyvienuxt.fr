import { PrismaClient } from 'square630-prisma'
import { requireAdmin } from '../../../utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)
    
    const contactId = parseInt(getRouterParam(event, 'id') || '0')

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

    // Supprimer le contact d'urgence
    await prisma.emergencyContact.delete({
      where: { id: contactId }
    })

    return {
      success: true,
      message: 'Contact d\'urgence supprimé avec succès'
    }

  } catch (error: any) {
    console.error('Erreur suppression contact d\'urgence:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la suppression du contact d\'urgence'
    })
  } finally {
    await prisma.$disconnect()
  }
})