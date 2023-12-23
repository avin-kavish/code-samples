import { jsonResponse, Params, withValidatedBody } from "@/lib/utils"
import {
  deletePeakHours,
  PeakHoursSchema,
  updatePeakHours,
} from "@/lib/server/db/peak-hours"

export const POST = withValidatedBody(
  PeakHoursSchema,
  async (body, request, { params }: Params<{ id: string }>) => {
    const ph = await updatePeakHours(+params.id, body)
    return jsonResponse(ph)
  },
)

export const DELETE = async (
  request: Request,
  { params }: Params<{ id: string }>,
) => {
  await deletePeakHours(+params.id)
  return jsonResponse()
}
