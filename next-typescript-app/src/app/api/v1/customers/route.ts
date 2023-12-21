import {
  createCustomer,
  CustomerCreateSchema,
  listCustomers,
} from "@/lib/server/db/customers"
import { jsonResponse, parseOrRespond } from "@/lib/utils"

export const dynamic = "force-dynamic"

/**
 * Get list of customers
 */
export const GET = async (request: Request) => {
  const customers = await listCustomers()
  return jsonResponse(customers)
}

/**
 * Create a customer
 */
export const POST = async (request: Request) => {
  const body = await request.json()

  const input = parseOrRespond(CustomerCreateSchema, body)
  if (input instanceof Response) return input

  const customer = await createCustomer(input)
  return jsonResponse(customer)
}
