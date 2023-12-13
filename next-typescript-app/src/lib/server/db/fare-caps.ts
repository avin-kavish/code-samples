import { prisma } from "@/lib/server/db/client"

export function listFareCaps() {
  return prisma.fareCap.findMany()
}
