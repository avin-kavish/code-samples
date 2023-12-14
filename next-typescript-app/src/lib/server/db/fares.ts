import { prisma } from "@/lib/server/db/client"
import z from "zod"

export function listFares() {
  return prisma.fare.findMany()
}

export const FareCreateSchema = z.object({
  from: z.string(),
  to: z.string(),
  peakFare: z.number(),
  offPeakFare: z.number(),
})
type FareCreateSchema = z.infer<typeof FareCreateSchema>

export function createFare(data: FareCreateSchema) {
  return prisma.fare.create({ data })
}

export function updateFare(id: number, data: FareCreateSchema) {
  return prisma.fare.update({ where: { id }, data })
}
