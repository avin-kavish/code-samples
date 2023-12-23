import { jsonResponse, Params, withValidatedBody } from "@/lib/utils"
import { deleteFare, updateFare } from "@/lib/server/db/fares"
import { FareCreateSchema } from "@/lib/schema"

export const POST = withValidatedBody(
  FareCreateSchema,
  async (body, request, { params }: Params<{ id: string }>) => {
    const fare = await updateFare(+params.id, body)
    return jsonResponse(fare)
  },
)

export const DELETE = async (
  request: Request,
  { params }: Params<{ id: string }>,
) => {
  await deleteFare(+params.id)
  return jsonResponse()
}
