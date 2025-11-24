import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // Get authenticated user
    const user = event.context.user

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Non authentifié'
        })
    }

    // Check if user is a teacher or admin
    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { roles: true }
    })

    if (!dbUser || (dbUser.roles !== 'PROF' && dbUser.roles !== 'admin')) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Accès réservé aux professeurs'
        })
    }

    try {
        // Fetch user's teaching groups with approved registrations
        const userWithGroups = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
                teachingGroups: {
                    include: {
                        registrations: {
                            where: {
                                status: 'APPROVED'
                            },
                            include: {
                                dancer: {
                                    include: {
                                        emergencyContacts: true,
                                        guardian: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return {
            groups: userWithGroups?.teachingGroups || []
        }
    } catch (error) {
        console.error('Error fetching teacher groups:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Erreur lors de la récupération des groupes'
        })
    }
})
