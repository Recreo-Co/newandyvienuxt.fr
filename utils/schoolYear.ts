/**
 * Utilitaires pour gérer les années scolaires
 * Année scolaire : bascule le 1er AOUT (ouverture des renouvellements)
 */

/**
 * Obtient l'année scolaire actuelle au format "YYYY-YYYY"
 */
export function getCurrentSchoolYear(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // getMonth() retourne 0-11
  
  // A partir d aout (8), l annee scolaire commence cette annee : la bascule a ete
  // avancee de septembre a aout le 03/08/2026 pour ouvrir les renouvellements plus tot.
  if (month >= 8) {
    return `${year}-${year + 1}`
  } else {
    return `${year - 1}-${year}`
  }
}

/**
 * Obtient la prochaine année scolaire
 */
export function getNextSchoolYear(): string {
  const current = getCurrentSchoolYear()
  const [startYear] = current.split('-').map(Number)
  return `${startYear + 1}-${startYear + 2}`
}

/**
 * Obtient l'année scolaire précédente
 */
export function getPreviousSchoolYear(): string {
  const current = getCurrentSchoolYear()
  const [startYear] = current.split('-').map(Number)
  return `${startYear - 1}-${startYear}`
}

/**
 * Vérifie si une année scolaire est l'année actuelle
 */
export function isCurrentSchoolYear(schoolYear: string): boolean {
  return schoolYear === getCurrentSchoolYear()
}

/**
 * Formate une année scolaire pour l'affichage
 */
export function formatSchoolYear(schoolYear: string): string {
  return `Année scolaire ${schoolYear}`
}

/**
 * Obtient toutes les années scolaires possibles (pour les selects)
 */
export function getAvailableSchoolYears(): Array<{ value: string; label: string }> {
  const previous = getPreviousSchoolYear()
  const current = getCurrentSchoolYear()
  const next = getNextSchoolYear()
  
  return [
    { value: previous, label: formatSchoolYear(previous) },
    { value: current, label: formatSchoolYear(current) + ' (actuelle)' },
    { value: next, label: formatSchoolYear(next) }
  ]
}

/**
 * Détermine si on peut s'inscrire pour une année scolaire donnée
 */
export function canRegisterForSchoolYear(schoolYear: string): boolean {
  const current = getCurrentSchoolYear()
  const next = getNextSchoolYear()
  
  // On peut s'inscrire pour l'année actuelle ou la suivante
  return schoolYear === current || schoolYear === next
}