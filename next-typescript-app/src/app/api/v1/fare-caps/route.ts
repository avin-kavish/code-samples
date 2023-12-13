import { listFareCaps } from "@/lib/server/db/fare-caps"

export const dynamic = "force-dynamic"

/**
 * Get list of fare caps
 * @constructor
 */
export const GET = async (request: Request) => {
  const fareCaps = await listFareCaps()
  return Response.json(fareCaps)
}
