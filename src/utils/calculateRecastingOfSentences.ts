import { SentenceFormData } from "@/types/RecastingSentencesForm"

const MAX_PENALTY_LIMITS = {
  general: 20, // Límite general de acumulación (en años)
  specialCase: 25, // Casos especiales (terrorismo, narcotráfico, etc.)
  graveCases: 30, // Delitos graves específicos
  extremeCases: 40, // Límite máximo absoluto
}

export const calculateAccumulatedSentence = ({
  sentences,
  validateSupremeCourtCriteria,
}: SentenceFormData) => {
  // 1. Ordenar las sentencias por la fecha de los hechos
  const sortedSentences = sentences.sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  )

  let totalYears = 0
  let totalMonths = 0
  let totalDays = 0

  // 2. Calcular la pena acumulada considerando delitos continuados y casos especiales
  sortedSentences.forEach((sentence) => {
    if (sentence.isContinuousCrime) {
      // Delito continuado: Tomar solo la pena más grave, aumentada en grado
      if (totalYears < sentence.durationYears) {
        totalYears = sentence.durationYears + 1 // Ejemplo: Aumentar en grado (personalizable)
      } else if (totalYears === sentence.durationYears) {
        totalMonths = Math.max(totalMonths, sentence.durationMonths)
        totalDays = Math.max(totalDays, sentence.durationDays)
      }
    } else {
      // Delitos independientes: Acumular penas
      totalYears += sentence.durationYears
      totalMonths += sentence.durationMonths
      totalDays += sentence.durationDays
    }
  })

  // 3. Ajustar los meses y días acumulados
  totalMonths += Math.floor(totalDays / 30)
  totalDays = totalDays % 30

  totalYears += Math.floor(totalMonths / 12)
  totalMonths = totalMonths % 12

  // 4. Aplicar límites según el tipo y gravedad del delito
  let maxPenaltyLimit = MAX_PENALTY_LIMITS.general

  if (sortedSentences.some((sentence) => sentence.isSpecialCase)) {
    maxPenaltyLimit = MAX_PENALTY_LIMITS.specialCase
  }

  if (
    sortedSentences.some((sentence) => sentence.crimeSeverity === "muy grave")
  ) {
    maxPenaltyLimit = MAX_PENALTY_LIMITS.graveCases
  }

  if (validateSupremeCourtCriteria) {
    // Aplicar criterios específicos del Tribunal Supremo (personalizable)
    maxPenaltyLimit = MAX_PENALTY_LIMITS.extremeCases
  }

  // Limitar la acumulación de años según el máximo permitido
  totalYears = Math.min(totalYears, maxPenaltyLimit)

  // 5. Calcular la fecha de fin de cumplimiento de penas
  const firstSentenceStartDate = new Date(sortedSentences[0].sentenceDate)
  const endDate = new Date(
    firstSentenceStartDate.getFullYear() + totalYears,
    firstSentenceStartDate.getMonth() + totalMonths,
    firstSentenceStartDate.getDate() + totalDays
  )

  return {
    totalYears,
    totalMonths,
    totalDays,
    endDate,
    maxPenaltyLimit,
  }
}
