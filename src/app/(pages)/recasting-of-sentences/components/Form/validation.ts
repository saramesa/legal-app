import * as Yup from "yup"

export const validationSchema = Yup.object({
  sentences: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required("La ID es obligatoria."),
        sentenceDate: Yup.date().required(
          "La fecha de la sentencia es obligatoria."
        ),
        eventDate: Yup.date().required(
          "La fecha de los hechos es obligatoria."
        ),
        durationYears: Yup.number()
          .min(0, "Debe ser mayor o igual a 0")
          .required("Los años son obligatorios."),
        durationMonths: Yup.number()
          .min(0, "Debe ser mayor o igual a 0")
          .max(11, "No puede ser mayor a 11 meses")
          .required("Los meses son obligatorios."),
        durationDays: Yup.number()
          .min(0, "Debe ser mayor o igual a 0")
          .max(31, "No puede ser mayor a 31 días")
          .required("Los días son obligatorios."),
        crimeType: Yup.string().required("El tipo de delito es obligatorio."),
        crimeSeverity: Yup.string().required(
          "La gravedad del delito es obligatoria."
        ),
        isSpecialCase: Yup.boolean(),
        isContinuousCrime: Yup.boolean(),
      })
    )
    .required("Debe haber al menos una sentencia."),
  validateSupremeCourtCriteria: Yup.boolean(),
})
