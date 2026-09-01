import jwt from 'jsonwebtoken'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    console.log('=== DÉBUT renew-complete.post.ts ===')
    
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
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
      userId = decoded.userId
    } catch (jwtError) {
      console.error('JWT Error:', jwtError)
      throw createError({
        statusCode: 401,
        statusMessage: 'Token invalide ou expiré'
      })
    }

    const body = await readBody(event)
    const { schoolYear, personalData, guardianData, emergencyContacts, healthData, sportCodeData, selectedGroups } = body

    console.log('Données reçues:', {
      schoolYear,
      personalData: personalData ? 'OK' : 'MISSING',
      selectedGroups: selectedGroups ? selectedGroups.length : 'MISSING',
      userId
    })

    if (!schoolYear || !personalData || !healthData || !selectedGroups || selectedGroups.length === 0) {
      console.error('Données manquantes:', { schoolYear, personalData: !!personalData, healthData: !!healthData, selectedGroups: selectedGroups?.length })
      throw createError({
        statusCode: 400,
        statusMessage: 'Données de renouvellement incomplètes'
      })
    }

    // Vérifier la déclaration santé
    if (!healthData.healthDeclaration) {
      throw createError({
        statusCode: 400,
        statusMessage: 'La déclaration sur le questionnaire santé est obligatoire'
      })
    }

    // Vérifier qu'il n'y a pas déjà une inscription active pour l'année demandée
    // On permet le renouvellement si l'inscription précédente a été rejetée
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        dancer: {
          userId: userId
        },
        schoolYear: schoolYear,
        status: {
          in: ['SUBMITTED', 'APPROVED'] // On exclut 'REJECTED' pour permettre le renouvellement
        }
      }
    })

    if (existingRegistration) {
      const statusText = existingRegistration.status === 'APPROVED' ? 'approuvée' : 'en attente de validation'
      throw createError({
        statusCode: 409,
        statusMessage: `Vous avez déjà une inscription ${statusText} pour l'année ${schoolYear}`
      })
    }

    // Récupérer le danseur existant
    const existingDancer = await prisma.dancer.findFirst({
      where: { userId: userId }
    })

    if (!existingDancer) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Aucune inscription précédente trouvée'
      })
    }

    // Fonction pour convertir les tailles de t-shirt
    const convertTShirtSize = (size: string): string => {
      // Si c'est déjà une valeur enum valide, la retourner directement
      const validEnumValues = ['SIZE_6', 'SIZE_8', 'SIZE_10', 'SIZE_12', 'SIZE_14', 'SIZE_16', 
                               'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      if (validEnumValues.includes(size)) {
        return size
      }
      
      // Sinon, convertir les valeurs numériques ou autres formats
      const mapping: Record<string, string> = {
        '6': 'SIZE_6',
        '8': 'SIZE_8',
        '10': 'SIZE_10',
        '12': 'SIZE_12',
        '14': 'SIZE_14',
        '16': 'SIZE_16',
        'XXS': 'XXS',
        'XS': 'XS',
        'S': 'S',
        'M': 'M',
        'L': 'L',
        'XL': 'XL',
        'XXL': 'XXL',
        'XXXL': 'XXXL'
      }
      return mapping[size] || 'M'
    }

    // Fonction pour convertir les niveaux scolaires
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

    // Mettre à jour les informations du danseur si nécessaire
    const updatedDancerData: any = {
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      email: personalData.email,
      phone: personalData.phone,
      birthDate: personalData.birthDate ? new Date(personalData.birthDate) : existingDancer.birthDate,
      schoolLevel: convertSchoolLevel(personalData.schoolLevel || existingDancer.schoolLevel),
      tShirtSize: convertTShirtSize(personalData.tShirtSize || existingDancer.tShirtSize),
      address: personalData.address,
      postalCode: personalData.postalCode,
      city: personalData.city,
    }

    // Gérer les informations supplémentaires et notes médicales
    let medicalNotes = personalData.otherInfo || existingDancer.otherInfo || ''
    const medicalNoteTag = `[RENOUVELLEMENT ${schoolYear} - CERTIFICAT MÉDICAL REQUIS`
    if (healthData.healthStatus === 'positive' && !medicalNotes.includes(medicalNoteTag)) {
      const newMedicalNote = `\n${medicalNoteTag} - Déclaré le ${new Date().toISOString()}]`
      medicalNotes += newMedicalNote
    }
    updatedDancerData.otherInfo = medicalNotes

    // Toutes les écritures sont regroupées dans une seule transaction : si une
    // étape échoue, rien n'est écrit. Nécessite InnoDB (MyISAM ignore les
    // transactions en silence).
    const journal = await prisma.$transaction(async (tx) => {
      const lignes: string[] = []

      // Mettre à jour le danseur
      await tx.dancer.update({
        where: { id: existingDancer.id },
        data: updatedDancerData
      })

      // Mettre à jour les informations du responsable légal si nécessaire
      if (guardianData) {
        const existingGuardian = await tx.guardian.findFirst({
          where: { dancerId: existingDancer.id }
        })

        if (existingGuardian) {
          await tx.guardian.update({
            where: { id: existingGuardian.id },
            data: {
              firstName: guardianData.firstName,
              lastName: guardianData.lastName,
              email: guardianData.email,
              phone: guardianData.phone,
              relationship: guardianData.relationship,
              authorized: guardianData.authorized,
              address: personalData.address,
              postalCode: personalData.postalCode,
              city: personalData.city
            }
          })
        } else {
          // Créer un nouveau responsable légal si il n'en existait pas
          await tx.guardian.create({
            data: {
              dancerId: existingDancer.id,
              firstName: guardianData.firstName,
              lastName: guardianData.lastName,
              email: guardianData.email,
              phone: guardianData.phone,
              relationship: guardianData.relationship,
              authorized: guardianData.authorized,
              address: personalData.address,
              postalCode: personalData.postalCode,
              city: personalData.city
            }
          })
        }
      }

      // Mettre à jour les contacts d'urgence si fournis
      if (emergencyContacts && Array.isArray(emergencyContacts)) {
        // Supprimer les anciens contacts d'urgence
        await tx.emergencyContact.deleteMany({
          where: { dancerId: existingDancer.id }
        })

        // Créer les nouveaux contacts d'urgence
        for (const contact of emergencyContacts) {
          if (contact.firstName && contact.lastName && contact.phone && contact.relationship) {
            await tx.emergencyContact.create({
              data: {
                dancerId: existingDancer.id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phone: contact.phone,
                relationship: contact.relationship,
                type: 'EMERGENCY_ONLY'
              }
            })
          }
        }
      }

      // Créer les nouvelles inscriptions pour les groupes sélectionnés
      for (const group of selectedGroups) {
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

        // Vérifier si une inscription ACTIVE existe déjà pour ce groupe et cette année
        // On permet de créer une nouvelle inscription même s'il y en a une rejetée
        const existingActiveRegistrationForGroup = await tx.registration.findFirst({
          where: {
            dancerId: existingDancer.id,
            danceGroupId: danceGroup.id,
            schoolYear: schoolYear,
            status: {
              in: ['SUBMITTED', 'APPROVED'] // On exclut 'REJECTED'
            }
          }
        })

        if (!existingActiveRegistrationForGroup) {
          // Créer une nouvelle inscription (même s'il y en a une rejetée, on garde l'historique)
          await tx.registration.create({
            data: {
              dancerId: existingDancer.id,
              danceGroupId: danceGroup.id,
              schoolYear: schoolYear,
              sportCode: sportCodeData?.sportCode || null,
              status: 'SUBMITTED',
              submittedAt: new Date(),
              reviewedAt: null,
              reviewedBy: null,
              notes: `Renouvellement depuis année précédente. ${healthData.healthStatus === 'positive' ? 'Certificat médical requis.' : ''}`
            }
          })
          lignes.push(`Created new registration for dancer ${existingDancer.id} in group ${danceGroup.id} for year ${schoolYear}`)
        } else {
          lignes.push(`Active registration already exists for dancer ${existingDancer.id} in group ${danceGroup.id} for year ${schoolYear} (status: ${existingActiveRegistrationForGroup.status})`)
        }
      }

      return lignes
    }, { maxWait: 10000, timeout: 20000 })

    // Journalisé seulement après commit, pour ne pas annoncer des écritures annulées
    for (const ligne of journal) console.log(ligne)

    console.log('=== Renouvellement terminé avec succès ===')
    return {
      success: true,
      message: 'Renouvellement effectué avec succès',
      dancerId: existingDancer.id,
      schoolYear: schoolYear,
      selectedGroups: selectedGroups.length
    }

  } catch (error: any) {
    console.error('Erreur lors du renouvellement:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Erreur lors du renouvellement'
    })
  }
})