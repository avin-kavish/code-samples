import z from "zod"

import { prisma } from "@/lib/server/db/client"

export function listCustomers() {
  return prisma.customer.findMany()
}

export const CustomerCreateSchema = z.object({
  name: z.string().min(1),
})
export type CustomerCreateSchema = z.infer<typeof CustomerCreateSchema>

export function createCustomer(data: CustomerCreateSchema) {
  return prisma.customer.create({ data })
}

export function updateCustomer(id: number, data: CustomerCreateSchema) {
  return prisma.customer.update({ where: { id }, data })
}

export function deleteCustomer(id: number) {
  return prisma.customer.delete({ where: { id } })
}
