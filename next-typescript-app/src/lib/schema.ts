import z from "zod"

export const FareCreateSchema = z.object({
  from: z.string(),
  to: z.string(),
  // TODO: validate these without coercion.
  peakFare: z.coerce.number().positive(),
  offPeakFare: z.coerce.number().positive(),
})
export type FareCreateSchema = z.infer<typeof FareCreateSchema>

export const FareCapsCreateSchema = z.object({
  from: z.string(),
  to: z.string(),
  dailyCap: z.coerce.number().positive(),
  weeklyCap: z.coerce.number().positive(),
})
export type FareCapsCreateSchema = z.infer<typeof FareCapsCreateSchema>
