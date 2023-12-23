import { createFare, listFares } from "@/lib/server/db/fares"
import { jsonResponse, withValidatedBody } from "@/lib/utils"
import { FareCreateSchema } from "@/lib/schema"

export const dynamic = "force-dynamic"

/**
 * Get list of fares
 */
export const GET = async (request: Request) => {
  const fares = await listFares()
  return jsonResponse(fares)
}

/**
 * Create a new fare
 */
export const POST = withValidatedBody(FareCreateSchema, async body => {
  const fare = await createFare(body)
  return jsonResponse(fare)
})
