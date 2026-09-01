import { PrismaClient } from 'square630-prisma'
import jwt from 'jsonwebtoken'
import { getCurrentSchoolYear } from '../../../../utils/schoolYear'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
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

    // Statistiques de la SAISON EN COURS uniquement (bascule au 1er août).
    // Sans ce filtre, les effectifs cumulaient toutes les saisons depuis la
    // création du groupe et ne voulaient plus rien dire.
    const schoolYear = getCurrentSchoolYear()

    const groups = await prisma.danceGroup.findMany({
      include: {
        registrations: {
          where: { schoolYear },
          include: {
            dancer: {
              include: {
                user: {
                  select: {
                    email: true
                  }
                },
                emergencyContacts: true,
                guardian: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Calculer les statistiques pour chaque groupe
    const groupStats = groups.map(group => {
      const registrations = group.registrations || []
      
      const totalDancers = registrations.length
      const submittedCount = registrations.filter(r => r.status === 'SUBMITTED').length
      const approvedCount = registrations.filter(r => r.status === 'APPROVED').length
      const rejectedCount = registrations.filter(r => r.status === 'REJECTED').length
      const draftCount = registrations.filter(r => r.status === 'DRAFT').length

      // Liste des danseurs avec leurs détails
      const dancers = registrations.map(registration => {
        const dancer = registration.dancer
        return {
          id: dancer.id,
          registrationId: registration.id,
          firstName: dancer.firstName,
          lastName: dancer.lastName,
          email: dancer.email,
          phone: dancer.phone,
          birthDate: dancer.birthDate,
          schoolLevel: dancer.schoolLevel,
          tShirtSize: dancer.tShirtSize,
          address: dancer.address,
          postalCode: dancer.postalCode,
          city: dancer.city,
          otherInfo: dancer.otherInfo,
          status: registration.status,
          registrationDate: registration.createdAt,
          submittedAt: registration.submittedAt,
          emergencyContacts: dancer.emergencyContacts || [],
          guardian: dancer.guardian,
          userEmail: dancer.user?.email
        }
      }).sort((a, b) => a.lastName.localeCompare(b.lastName))

      return {
        id: group.id,
        name: group.name,
        description: group.description,
        schedule: group.schedule,
        ageGroup: group.ageGroup,
        isActive: group.isActive,
        stats: {
          totalDancers,
          submittedCount,
          approvedCount,
          rejectedCount,
          draftCount
        },
        dancers
      }
    })

    // Statistiques globales
    const globalStats = {
      totalGroups: groups.length,
      activeGroups: groups.filter(g => g.isActive).length,
      totalDancers: groupStats.reduce((sum, group) => sum + group.stats.totalDancers, 0),
      totalSubmitted: groupStats.reduce((sum, group) => sum + group.stats.submittedCount, 0),
      totalApproved: groupStats.reduce((sum, group) => sum + group.stats.approvedCount, 0),
      totalRejected: groupStats.reduce((sum, group) => sum + group.stats.rejectedCount, 0),
      totalDraft: groupStats.reduce((sum, group) => sum + group.stats.draftCount, 0)
    }

    return {
      success: true,
      schoolYear,
      globalStats,
      groups: groupStats
    }

  } catch (error: any) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la récupération des statistiques'
    })
  } finally {
    await prisma.$disconnect()
  }
})