import { jsonResponse, Params, withValidatedBody } from "@/lib/utils"
import { deleteFareCap, updateFareCap } from "@/lib/server/db/fare-caps"
import { FareCapsCreateSchema } from "@/lib/schema"

export const POST = withValidatedBody(
  FareCapsCreateSchema,
  async (body, request, { params }: Params<{ id: string }>) => {
    const fare = await updateFareCap(+params.id, body)
    return jsonResponse(fare)
  },
)

export const DELETE = async (
  request: Request,
  { params }: Params<{ id: string }>,
) => {
  await deleteFareCap(+params.id)
  return jsonResponse()
}
