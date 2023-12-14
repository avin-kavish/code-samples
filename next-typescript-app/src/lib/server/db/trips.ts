import { prisma } from "@/lib/server/db/client"
import z from "zod"

export function listTrips() {
  return prisma.trip.findMany()
}

export const TripCreateSchema = z.object({
  customerId: z.number(),
  from: z.string(),
  to: z.string(),
  date: z.string().datetime(),
})
export type TripCreateSchema = z.infer<typeof TripCreateSchema>

export function createTrip(data: TripCreateSchema) {
  return prisma.trip.create({ data })
}
