import { withValidatedBody } from "@/lib/utils"
import { FareCreateSchema, updateFare } from "@/lib/server/db/fares"

export const POST = withValidatedBody(
  FareCreateSchema,
  async (body, request, params: { id: string }) => {
    const fare = await updateFare(+params.id, body)
    return Response.json(fare)
  },
)
