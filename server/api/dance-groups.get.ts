import { PrismaClient } from 'square630-prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Récupérer l'âge du danseur depuis la query string (optionnel)
    const query = getQuery(event)
    const dancerAge = query.age ? parseInt(query.age as string) : null

    // Construire les conditions de filtrage
    const whereConditions: any = {
      isActive: true
    }

    // Si un âge est fourni, filtrer selon les restrictions d'âge
    if (dancerAge !== null && !isNaN(dancerAge)) {
      whereConditions.AND = [
        {
          OR: [
            { ageMin: null }, // Pas de restriction d'âge minimum
            { ageMin: { lte: dancerAge } } // Âge minimum respecté
          ]
        },
        {
          OR: [
            { ageMax: null }, // Pas de restriction d'âge maximum
            { ageMax: { gte: dancerAge } } // Âge maximum respecté
          ]
        }
      ]
    }

    // Debug logging
    console.log('API /dance-groups called with:', { dancerAge, whereConditions: JSON.stringify(whereConditions, null, 2) })

    // Récupérer les groupes de danse selon les critères
    const danceGroups = await prisma.danceGroup.findMany({
      where: whereConditions,
      orderBy: [
        { id: 'asc' }
      ]
    })

    console.log(`Found ${danceGroups.length} groups:`, danceGroups.map(g => ({ id: g.id, name: g.name, ageMin: g.ageMin, ageMax: g.ageMax })))

    return {
      success: true,
      groups: danceGroups,
      filteredByAge: dancerAge !== null && !isNaN(dancerAge),
      dancerAge: dancerAge
    }

  } catch (error: any) {
    console.error('Erreur lors de la récupération des groupes de danse:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des groupes de danse'
    })
  } finally {
    await prisma.$disconnect()
  }
})