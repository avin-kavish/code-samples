import { prisma } from "@/lib/server/db/client"
import { CustomerCreateSchema } from "@/lib/schema"

export function listCustomers() {
  return prisma.customer.findMany()
}

export function createCustomer(data: CustomerCreateSchema) {
  return prisma.customer.create({ data })
}

export function updateCustomer(id: number, data: CustomerCreateSchema) {
  return prisma.customer.update({ where: { id }, data })
}

export function deleteCustomer(id: number) {
  return prisma.customer.delete({ where: { id } })
}
