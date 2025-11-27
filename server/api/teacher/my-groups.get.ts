import { getAuthenticatedUser } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification
  const decoded = getAuthenticatedUser(event)

  // Récupérer l'utilisateur et vérifier qu'il est professeur
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: {
      teachingGroups: {
        include: {
          registrations: {
            where: { status: 'APPROVED' },
            include: {
              dancer: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  birthDate: true,
                  email: true,
                  phone: true,
                  tShirtSize: true,
                  otherInfo: true,
                  address: true,
                  city: true,
                  postalCode: true,
                  schoolLevel: true,
                  emergencyContacts: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      relationship: true,
                      phone: true,
                      email: true
                    }
                  },
                  guardian: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      email: true,
                      phone: true
                    }
                  }
                }
              }
            }
          },
          _count: {
            select: {
              registrations: true
            }
          }
        }
      }
    }
  })

  if (!user || (user.roles !== 'professor' && user.roles !== 'admin')) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Accès réservé aux professeurs'
    })
  }

  return {
    success: true,
    groups: user.teachingGroups
  }
})
