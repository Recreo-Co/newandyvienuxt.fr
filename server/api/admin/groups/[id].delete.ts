import { PrismaClient } from 'square630-prisma'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const groupId = parseInt(getRouterParam(event, 'id') || '0')

    if (!groupId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID du groupe invalide'
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

    // Vérifier que le groupe existe
    const existingGroup = await prisma.danceGroup.findUnique({
      where: { id: groupId },
      include: {
        _count: {
          select: {
            registrations: true
          }
        }
      }
    })

    if (!existingGroup) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Groupe non trouvé'
      })
    }

    // Vérifier s'il y a des inscriptions liées
    if (existingGroup._count.registrations > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Impossible de supprimer ce groupe car ${existingGroup._count.registrations} inscription(s) y sont liées. Vous pouvez désactiver le groupe à la place.`
      })
    }

    // Supprimer le groupe
    await prisma.danceGroup.delete({
      where: { id: groupId }
    })

    return {
      success: true,
      message: 'Groupe supprimé avec succès'
    }

  } catch (error: any) {
    console.error('Erreur lors de la suppression du groupe:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la suppression du groupe'
    })
  } finally {
    await prisma.$disconnect()
  }
})