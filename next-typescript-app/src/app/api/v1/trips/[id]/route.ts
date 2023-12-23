import { deleteTrip } from "@/lib/server/db/trips"
import { jsonResponse, Params } from "@/lib/utils"

export const DELETE = async (
  request: Request,
  { params }: Params<{ id: string }>,
) => {
  await deleteTrip(+params.id)
  return jsonResponse()
}
