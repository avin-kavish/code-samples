import { deleteTrip } from "@/lib/server/db/trips"

export const DELETE = async (request: Request, params: { id: string }) => {
  await deleteTrip(+params.id)
  return new Response()
}
