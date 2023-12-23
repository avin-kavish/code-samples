import { prisma } from "@/lib/server/db/client"
import { FareCreateSchema } from "@/lib/schema"

export function listFares() {
  return prisma.fare.findMany()
}

export function createFare(data: FareCreateSchema) {
  return prisma.fare.create({ data })
}

export function updateFare(id: number, data: FareCreateSchema) {
  return prisma.fare.update({ where: { id }, data })
}

export function deleteFare(id: number) {
  return prisma.fare.delete({ where: { id } })
}
