import { prisma } from "@/lib/server/db/client"
import { TripCreateSchema } from "@/lib/schema"

interface ListArgs {
  expand?: string[]
  customerId?: bigint
}

export function listTrips(args: ListArgs = {}) {
  return prisma.trip.findMany({
    include: { customer: args.expand?.includes("customer") },
    where: { customerId: args.customerId },
    orderBy: { date: "desc" },
  })
}

export function createTrip(data: TripCreateSchema, args: ListArgs = {}) {
  return prisma.trip.create({
    data,
    include: { customer: args.expand?.includes("customer") },
  })
}

export function deleteTrip(id: number) {
  return prisma.trip.delete({ where: { id } })
}
