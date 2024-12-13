"use client"

import { calculateAccumulatedSentence } from "@/utils/calculateRecastingOfSentences"
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik"

import { SentenceFormData } from "@/types/RecastingSentencesForm"

import { validationSchema } from "./validation"

const SentenceForm: React.FC = () => {
  const initialValues: SentenceFormData = {
    sentences: [
      {
        id: "",
        sentenceDate: "",
        eventDate: "",
        durationYears: 0,
        durationMonths: 0,
        durationDays: 0,
        crimeType: "",
        crimeSeverity: "",
        isSpecialCase: false,
        isContinuousCrime: false,
      },
    ],
    validateSupremeCourtCriteria: true,
  }

  // Uso dentro de tu componente SentenceForm
  const handleSubmit = (values: SentenceFormData) => {
    const result = calculateAccumulatedSentence(values)
    alert(
      `La refundición de penas es ${result.totalYears} ${result.totalMonths} ${result.totalDays}`
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form className="space-y-8">
          <FieldArray name="sentences">
            {({ push, remove }) => (
              <>
                {values.sentences.map((value, index) => (
                  <div
                    key={`sentence-form-${value.id}`}
                    className="space-y-4 rounded-md border border-gray-300 p-4"
                  >
                    <div>
                      <label
                        htmlFor={`sentences.${index}.id`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        ID o Referencia de la Sentencia
                      </label>
                      <Field
                        type="text"
                        name={`sentences.${index}.id`}
                        id={`sentences.${index}.id`}
                        className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name={`sentences.${index}.id`}
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      <div>
                        <label
                          htmlFor={`sentences.${index}.sentenceDate`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fecha de la Sentencia
                        </label>
                        <Field
                          type="date"
                          name={`sentences.${index}.sentenceDate`}
                          id={`sentences.${index}.sentenceDate`}
                          className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name={`sentences.${index}.sentenceDate`}
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`sentences.${index}.eventDate`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fecha de los Hechos
                        </label>
                        <Field
                          type="date"
                          name={`sentences.${index}.eventDate`}
                          id={`sentences.${index}.eventDate`}
                          className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name={`sentences.${index}.eventDate`}
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`sentences.${index}.durationYears`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Años
                        </label>
                        <Field
                          type="number"
                          name={`sentences.${index}.durationYears`}
                          id={`sentences.${index}.durationYears`}
                          className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name={`sentences.${index}.durationYears`}
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`sentences.${index}.durationMonths`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Meses
                        </label>
                        <Field
                          type="number"
                          name={`sentences.${index}.durationMonths`}
                          id={`sentences.${index}.durationMonths`}
                          className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name={`sentences.${index}.durationMonths`}
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`sentences.${index}.durationDays`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Días
                        </label>
                        <Field
                          type="number"
                          name={`sentences.${index}.durationDays`}
                          id={`sentences.${index}.durationDays`}
                          className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name={`sentences.${index}.durationDays`}
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`sentences.${index}.crimeSeverity`}
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Gravedad del Delito
                        </label>
                        <Field
                          as="select"
                          name={`sentences.${index}.crimeSeverity`}
                          id={`sentences.${index}.crimeSeverity`}
                          className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Seleccione una gravedad</option>
                          <option value="leve">Leve</option>
                          <option value="grave">Grave</option>
                          <option value="muy_grave">Muy grave</option>
                        </Field>
                        <ErrorMessage
                          name={`sentences.${index}.crimeSeverity`}
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`sentences.${index}.crimeType`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tipo de Delito
                        </label>
                        <Field
                          as="select"
                          name={`sentences.${index}.crimeType`}
                          id={`sentences.${index}.crimeType`}
                          className="mt-1 block w-full  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Seleccione un tipo</option>
                          <option value="homicidio">Homicidio</option>
                          <option value="robo">Robo</option>
                          <option value="fraude">Fraude</option>
                          <option value="otros">Otros</option>
                        </Field>
                        <ErrorMessage
                          name={`sentences.${index}.crimeType`}
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>
                        <Field
                          type="checkbox"
                          name={`sentences.${index}.isSpecialCase`}
                          id={`sentences.${index}.isSpecialCase`}
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`sentences.${index}.isSpecialCase`}
                          className="ml-2 text-sm font-medium text-gray-700"
                        >
                          ¿Es un caso especial?
                        </label>
                      </div>
                      <div>
                        <Field
                          type="checkbox"
                          name={`sentences.${index}.isContinuousCrime`}
                          id={`sentences.${index}.isContinuousCrime`}
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`sentences.${index}.isContinuousCrime`}
                          className="ml-2 text-sm font-medium text-gray-700"
                        >
                          ¿El delito es continuo?
                        </label>
                      </div>
                    </div>
                    {index !== 0 && (
                      <button
                        type="button"
                        className="mt-4 text-red-500"
                        onClick={() => remove(index)}
                      >
                        Eliminar Sentencia
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                  onClick={() =>
                    push({
                      id: "",
                      sentenceDate: "",
                      eventDate: "",
                      durationYears: 0,
                      durationMonths: 0,
                      durationDays: 0,
                      crimeType: "",
                      crimeSeverity: "",
                      isSpecialCase: false,
                      isContinuousCrime: false,
                    })
                  }
                >
                  Añadir Sentencia
                </button>
              </>
            )}
          </FieldArray>
          <div>
            <Field
              type="checkbox"
              name="validateSupremeCourtCriteria"
              id="validateSupremeCourtCriteria"
              className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="validateSupremeCourtCriteria"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Validar criterios de la Corte Suprema
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-indigo-600 px-4 py-2 text-white"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default SentenceForm
