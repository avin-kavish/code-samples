import { createTrip, listTrips, TripCreateSchema } from "@/lib/server/db/trips"
import { jsonResponse, withValidatedBody } from "@/lib/utils"

export const dynamic = "force-dynamic"

/**
 * Get list of trips
 */
export const GET = async (request: Request) => {
  const trips = await listTrips()
  return jsonResponse(trips)
}

/**
 * Create a trip
 */
export const POST = withValidatedBody(TripCreateSchema, async body => {
  const trip = await createTrip(body)
  return jsonResponse(trip)
})
