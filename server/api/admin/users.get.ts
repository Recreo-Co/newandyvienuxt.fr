import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)

    // Récupérer tous les utilisateurs avec leurs relations
    const users = await prisma.user.findMany({
      include: {
        dancers: true,
        teachingGroups: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: {
            dancers: true,
            registrations: true,
            teachingGroups: true
          }
        }
      },
      orderBy: [
        { roles: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    // Masquer les mots de passe
    const sanitizedUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return {
      success: true,
      users: sanitizedUsers
    }

  } catch (error: any) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la récupération des utilisateurs'
    })
  } finally {
    await prisma.$disconnect()
  }
})
