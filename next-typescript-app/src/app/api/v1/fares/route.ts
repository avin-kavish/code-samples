import { listFares } from "@/lib/server/db/fares"

export const dynamic = "force-dynamic"

/**
 * Get list of fares
 * @constructor
 */
export const GET = async (request: Request) => {
  const fares = await listFares()
  return Response.json(fares)
}
