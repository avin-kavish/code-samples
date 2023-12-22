import { prisma } from "@/lib/server/db/client"
import z from "zod"

interface ListArgs {
  expand?: string[]
}

export function listTrips(args: ListArgs = {}) {
  return prisma.trip.findMany({
    include: { customer: args.expand?.includes("customer") },
  })
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

export function deleteTrip(id: number) {
  return prisma.trip.delete({ where: { id } })
}
