import { createTrip, listTrips } from "@/lib/server/db/trips"
import { jsonResponse, withValidatedBody } from "@/lib/utils"
import { TripCreateSchema } from "@/lib/schema"

export const dynamic = "force-dynamic"

/**
 * Get list of trips
 */
export const GET = async (request: Request) => {
  const expand = new URL(request.url).searchParams.get("expand")?.split(",")
  const trips = await listTrips({ expand })
  return jsonResponse(trips)
}

/**
 * Create a trip
 */
export const POST = withValidatedBody(
  TripCreateSchema,
  async (body, request) => {
    const expand = new URL(request.url).searchParams.get("expand")?.split(",")
    const trip = await createTrip(body, { expand })
    return jsonResponse(trip)
  },
)
