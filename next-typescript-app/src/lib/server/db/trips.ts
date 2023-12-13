import { prisma } from "@/lib/server/db/client"

export function listTrips() {
  return prisma.trip.findMany()
}
