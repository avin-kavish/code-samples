import z from "zod"

import { prisma } from "@/lib/server/db/client"

export function listCustomers() {
  return prisma.customer.findMany()
}

export const CustomerCreateSchema = z.object({
  name: z.string().min(1),
})

export function createCustomer({ name }: { name: string }) {
  return prisma.customer.create({ data: { name } })
}
