import { createFare, FareCreateSchema, listFares } from "@/lib/server/db/fares"
import { withValidatedBody } from "@/lib/utils"

export const dynamic = "force-dynamic"

/**
 * Get list of fares
 * @constructor
 */
export const GET = async (request: Request) => {
  const fares = await listFares()
  return Response.json(fares)
}

/**
 * Create a new fare
 */
export const POST = withValidatedBody(FareCreateSchema, async body => {
  const fare = await createFare(body)
  return Response.json(fare)
})
