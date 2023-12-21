import z from "zod"

import { prisma } from "@/lib/server/db/client"

export function listFareCaps() {
  return prisma.fareCap.findMany()
}

export const FareCapsCreateSchema = z.object({
  from: z.string(),
  to: z.string(),
  dailyCap: z.number(),
  weeklyCap: z.number(),
})
export type FareCapsCreateSchema = z.infer<typeof FareCapsCreateSchema>

export function createFareCap(data: FareCapsCreateSchema) {
  return prisma.fareCap.create({ data })
}

export function updateFareCap(id: number, data: FareCapsCreateSchema) {
  return prisma.fareCap.update({ where: { id }, data })
}

export function deleteFareCap(id: number) {
  return prisma.fareCap.delete({ where: { id } })
}
