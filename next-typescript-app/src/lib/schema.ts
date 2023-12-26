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

export const CustomerCreateSchema = z.object({
  name: z.string().min(1),
})
export type CustomerCreateSchema = z.infer<typeof CustomerCreateSchema>

export const TripCreateSchema = z.object({
  customerId: z.number(),
  from: z.string(),
  to: z.string(),
  date: z.string().datetime(),
})
export type TripCreateSchema = z.infer<typeof TripCreateSchema>
