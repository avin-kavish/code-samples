import {
  CustomerCreateSchema,
  deleteCustomer,
  updateCustomer,
} from "@/lib/server/db/customers"
import { jsonResponse, withValidatedBody } from "@/lib/utils"

export const POST = withValidatedBody(
  CustomerCreateSchema,
  async (body, request: Request, { params }: { params: { id: string } }) => {
    const customer = await updateCustomer(+params.id, body)
    return jsonResponse(customer)
  },
)

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  await deleteCustomer(+params.id)
  return jsonResponse()
}
