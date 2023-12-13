import { listTrips } from "@/lib/server/db/trips"

export const dynamic = "force-dynamic"

/**
 * Get list of trips
 * @constructor
 */
export const GET = async (request: Request) => {
  const trips = await listTrips()
  return Response.json(trips)
}
