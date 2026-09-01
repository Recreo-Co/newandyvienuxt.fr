import { dancers_tShirtSize } from 'square630-prisma'
import type { dancers_schoolLevel } from 'square630-prisma'
import jwt from 'jsonwebtoken'
import { prisma } from '../../utils/prisma'

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
    let userEmail: string
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
      userId = decoded.userId
      userEmail = decoded.email
    } catch (jwtError) {
      console.error('JWT Error:', jwtError)
      throw createError({
        statusCode: 401,
        statusMessage: 'Token invalide ou expiré'
      })
    }

    // Obtenir l'année scolaire actuelle
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const currentSchoolYear = month >= 9 ? `${year}-${year + 1}` : `${year - 1}-${year}`

    // Vérifier si l'utilisateur a déjà une inscription active pour l'année scolaire actuelle
    // On permet une nouvelle inscription si la précédente a été rejetée
    const existingCompleteRegistration = await prisma.registration.findFirst({
      where: { 
        dancer: {
          userId: userId
        },
        schoolYear: currentSchoolYear,
        status: {
          in: ['SUBMITTED', 'APPROVED'] // On exclut 'REJECTED' pour permettre une nouvelle inscription
        }
      }
    })

    if (existingCompleteRegistration) {
      const statusText = existingCompleteRegistration.status === 'APPROVED' ? 'approuvée' : 'en attente de validation'
      throw createError({
        statusCode: 409,
        statusMessage: `Vous avez déjà une inscription ${statusText}. Un seul dossier actif par utilisateur est autorisé.`
      })
    }

    // Récupérer les données du body
    const body = await readBody(event)
    const { step1, health, sportcode, step2, step3, step4 } = body

    if (!step1 || !health || !step4) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Données d\'inscription incomplètes (étape 1, questionnaire santé ou étape 4 manquante)'
      })
    }

    // Vérifier la déclaration santé
    if (!health.healthDeclaration) {
      throw createError({
        statusCode: 400,
        statusMessage: 'La déclaration sur le questionnaire santé est obligatoire'
      })
    }

    // Fonction pour convertir les tailles de t-shirt
    const convertTShirtSize = (size: string): dancers_tShirtSize => {
      // Créer un mapping explicite vers l'enum Prisma
      const mapping: Record<string, dancers_tShirtSize> = {
        '6': dancers_tShirtSize.SIZE_6,
        '8': dancers_tShirtSize.SIZE_8,
        '10': dancers_tShirtSize.SIZE_10,
        '12': dancers_tShirtSize.SIZE_12,
        '14': dancers_tShirtSize.SIZE_14,
        '16': dancers_tShirtSize.SIZE_16,
        'SIZE_6': dancers_tShirtSize.SIZE_6,
        'SIZE_8': dancers_tShirtSize.SIZE_8,
        'SIZE_10': dancers_tShirtSize.SIZE_10,
        'SIZE_12': dancers_tShirtSize.SIZE_12,
        'SIZE_14': dancers_tShirtSize.SIZE_14,
        'SIZE_16': dancers_tShirtSize.SIZE_16,
        'XXS': dancers_tShirtSize.XXS,
        'XS': dancers_tShirtSize.XS,
        'S': dancers_tShirtSize.S,
        'M': dancers_tShirtSize.M,
        'L': dancers_tShirtSize.L,
        'XL': dancers_tShirtSize.XL,
        'XXL': dancers_tShirtSize.XXL,
        'XXXL': dancers_tShirtSize.XXXL
      }
      
      const result = mapping[size]
      if (!result) {
        console.warn(`Taille de t-shirt non reconnue: ${size}, utilisation de M par défaut`)
        return dancers_tShirtSize.M
      }
      return result
    }

    // Fonction pour convertir les anciennes valeurs vers les nouvelles
    const convertSchoolLevel = (level: string) => {
      const mapping: Record<string, string> = {
        'CP': 'CP',
        'CE1': 'CE1', 
        'CE2': 'CE2',
        'CM1': 'CM1',
        'CM2': 'CM2',
        '6ème': 'SIXIEME',
        'SIXIEME': 'SIXIEME',
        '5ème': 'CINQUIEME',
        'CINQUIEME': 'CINQUIEME',
        '4ème': 'QUATRIEME',
        'QUATRIEME': 'QUATRIEME',
        '3ème': 'TROISIEME',
        'TROISIEME': 'TROISIEME',
        'Seconde': 'SECONDE',
        'SECONDE': 'SECONDE',
        'Première': 'PREMIERE',
        'PREMIERE': 'PREMIERE',
        'Terminale': 'TERMINALE',
        'TERMINALE': 'TERMINALE',
        'Bac+1': 'POST_BAC',
        'Bac+2': 'POST_BAC',
        'Bac+3': 'POST_BAC',
        'Bac+4': 'POST_BAC',
        'Bac+5 et plus': 'POST_BAC',
        'POST_BAC': 'POST_BAC',
        'Adulte': 'ADULTE',
        'ADULTE': 'ADULTE'
      }
      return mapping[level] || 'ADULTE'
    }

    // 1. Créer le danseur
    const tShirtSizeInput = step1.tShirtSize || step1.tshirtSize || 'M'
    const convertedTShirtSize = convertTShirtSize(tShirtSizeInput)
    
    // Log pour debug en production
    console.log('TShirt size conversion:', {
      input: tShirtSizeInput,
      converted: convertedTShirtSize,
      enumValues: Object.values(dancers_tShirtSize)
    })
    
    // Toutes les écritures sont regroupées dans une seule transaction : si une
    // étape échoue, rien n'est écrit. Sans ça, un échec en cours de route laissait
    // un danseur créé sans inscription. Nécessite InnoDB (MyISAM ignore les
    // transactions en silence).
    const dancer = await prisma.$transaction(async (tx) => {
      // Supprimer le dossier existant pour ce user (permet de recommencer)
      const existingDraftDancer = await tx.dancer.findFirst({
        where: { userId: userId }
      })

      if (existingDraftDancer) {
        // Supprimer toutes les données liées, enfants avant parent
        await tx.registration.deleteMany({
          where: { dancerId: existingDraftDancer.id }
        })
        await tx.emergencyContact.deleteMany({
          where: { dancerId: existingDraftDancer.id }
        })
        await tx.guardian.deleteMany({
          where: { dancerId: existingDraftDancer.id }
        })
        await tx.dancer.delete({
          where: { id: existingDraftDancer.id }
        })
      }

      // 1. Créer le danseur. La note de certificat médical est intégrée dès la
      // création plutôt que par un update séparé.
      const baseOtherInfo = step1.otherInfo || null
      const createdDancer = await tx.dancer.create({
        data: {
          userId: userId,
          email: step1.email || userEmail,
          firstName: step1.firstName,
          lastName: step1.lastName,
          birthDate: new Date(step1.birthDate),
          address: step1.address,
          postalCode: step1.postalCode,
          city: step1.city || 'Non spécifié',
          phone: step1.phone,
          schoolLevel: convertSchoolLevel(step1.schoolLevel || 'ADULTE') as dancers_schoolLevel,
          tShirtSize: convertedTShirtSize,
          otherInfo: health.requiresCertificate
            ? (baseOtherInfo || '') + '\n[CERTIFICAT MÉDICAL REQUIS - Déclaré le ' + new Date().toISOString() + ']'
            : baseOtherInfo,
        }
      })

      // 2. Créer le responsable légal si mineur
      if (step2 && step2.guardianEmail) {
        await tx.guardian.create({
          data: {
            dancerId: createdDancer.id,
            email: step2.guardianEmail,
            firstName: step2.guardianFirstName || 'Non spécifié',
            lastName: step2.guardianLastName || 'Non spécifié',
            address: step1.address,
            postalCode: step1.postalCode,
            city: step1.city || 'Non spécifié',
            phone: step1.phone,
            authorized: step2.guardianAuthorized || false,
            relationship: step2.guardianRelationship || 'Parent'
          }
        })
      }

      // 3. Créer les contacts d'urgence
      if (step3 && step3.emergencyContacts && step3.emergencyContacts.length > 0) {
        for (const contact of step3.emergencyContacts) {
          await tx.emergencyContact.create({
            data: {
              dancerId: createdDancer.id,
              type: contact.type || 'EMERGENCY_ONLY', // Utiliser le type fourni
              firstName: contact.firstName || '',
              lastName: contact.lastName || '',
              phone: contact.phone,
              relationship: contact.relationship || 'Proche'
            }
          })
        }
      }

      // 4. Créer les inscriptions aux groupes de danse
      if (step4 && step4.selectedDanceGroups && step4.selectedDanceGroups.length > 0) {
        for (const group of step4.selectedDanceGroups) {
          // Vérifier si le groupe existe, sinon le créer
          let danceGroup = await tx.danceGroup.findFirst({
            where: { name: group.name }
          })

          if (!danceGroup) {
            danceGroup = await tx.danceGroup.create({
              data: {
                name: group.name,
                ageGroup: group.ageGroup,
                schedule: group.schedule,
                description: group.description || '',
                isActive: true
              }
            })
          }

          // Créer l'inscription
          await tx.registration.create({
            data: {
              dancerId: createdDancer.id,
              danceGroupId: danceGroup.id,
              schoolYear: currentSchoolYear, // Ajouter l'année scolaire
              sportCode: sportcode?.sportCode || null,
              status: 'SUBMITTED', // Marquer comme SUBMITTED car l'inscription est complète
              submittedAt: new Date(),
              reviewedAt: null,
              reviewedBy: null,
              notes: null
            }
          })
        }
      }

      return createdDancer
    }, { maxWait: 10000, timeout: 20000 })

    return {
      success: true,
      message: 'Inscription sauvegardée avec succès',
      dancerId: dancer.id
    }

  } catch (error: any) {
    console.error('Erreur lors de la sauvegarde de l\'inscription:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Erreur lors de la sauvegarde de l\'inscription'
    })
  }
})