import z from "zod"

export const FareCreateSchema = z.object({
  from: z.string(),
  to: z.string(),
  // TODO: validate these without coercion.
  peakFare: z.coerce.number().positive(),
  offPeakFare: z.coerce.number().positive(),
})
export type FareCreateSchema = z.infer<typeof FareCreateSchema>
