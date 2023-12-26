import z from "zod"
import { DayOfWeek } from "@prisma/client"

const LineSchema = z.string().min(1)

export const FareCreateSchema = z.object({
  from: LineSchema,
  to: LineSchema,
  // TODO: validate these without coercion.
  peakFare: z.coerce.number().positive(),
  offPeakFare: z.coerce.number().positive(),
})
export type FareCreateSchema = z.infer<typeof FareCreateSchema>

export const FareCapsCreateSchema = z.object({
  from: LineSchema,
  to: LineSchema,
  dailyCap: z.coerce.number().positive(),
  weeklyCap: z.coerce.number().positive(),
})
export type FareCapsCreateSchema = z.infer<typeof FareCapsCreateSchema>

export const CustomerCreateSchema = z.object({
  name: z.string().min(1),
})
export type CustomerCreateSchema = z.infer<typeof CustomerCreateSchema>

export const TripCreateSchema = z.object({
  date: z.string().datetime(),
  customerId: z.number(),
  from: LineSchema,
  to: LineSchema,
})
export type TripCreateSchema = z.infer<typeof TripCreateSchema>

const HrsSchema = z.number().min(0).max(23)
const MinsSchema = z.number().min(0).max(59)

const TimeSchema = z
  .string()
  .length(4)
  .regex(/d{4}/)
  .superRefine(str => {
    const hr = +str.slice(0, 2)
    const min = +str.slice(2)

    HrsSchema.parse(hr)
    MinsSchema.parse(min)
  })

export const PeakHoursSchema = z.object({
  day: z.nativeEnum(DayOfWeek),
  start: TimeSchema,
  end: TimeSchema,
})
export type PeakHoursSchema = z.infer<typeof PeakHoursSchema>
