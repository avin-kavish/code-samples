import { jsonResponse, Params, withValidatedBody } from "@/lib/utils"
import {
  deleteFareCap,
  FareCapsCreateSchema,
  updateFareCap,
} from "@/lib/server/db/fare-caps"

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
