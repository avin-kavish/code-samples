import { prisma } from "@/lib/server/db/client"

export function listFares() {
  return prisma.fare.findMany()
}
