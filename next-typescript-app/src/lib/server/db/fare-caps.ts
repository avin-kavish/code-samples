import { prisma } from "@/lib/server/db/client"
import { FareCapsCreateSchema } from "@/lib/schema"

export function listFareCaps() {
  return prisma.fareCap.findMany()
}

export function createFareCap(data: FareCapsCreateSchema) {
  return prisma.fareCap.create({ data })
}

export function updateFareCap(id: number, data: FareCapsCreateSchema) {
  return prisma.fareCap.update({ where: { id }, data })
}

export function deleteFareCap(id: number) {
  return prisma.fareCap.delete({ where: { id } })
}
