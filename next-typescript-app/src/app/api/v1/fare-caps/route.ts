import { createFareCap, listFareCaps } from "@/lib/server/db/fare-caps"
import { jsonResponse, withValidatedBody } from "@/lib/utils"
import { FareCapsCreateSchema } from "@/lib/schema"

export const dynamic = "force-dynamic"

/**
 * Get list of fare caps
 */
export const GET = async (request: Request) => {
  const fareCaps = await listFareCaps()
  return jsonResponse(fareCaps)
}

/**
 * Create fare cap
 */
export const POST = withValidatedBody(FareCapsCreateSchema, async body => {
  const fareCap = await createFareCap(body)
  return jsonResponse(fareCap)
})
