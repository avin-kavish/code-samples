import {
  createFareCap,
  FareCapsCreateSchema,
  listFareCaps,
} from "@/lib/server/db/fare-caps"
import { withValidatedBody } from "@/lib/utils"

export const dynamic = "force-dynamic"

/**
 * Get list of fare caps
 * @constructor
 */
export const GET = async (request: Request) => {
  const fareCaps = await listFareCaps()
  return Response.json(fareCaps)
}

/**
 * Create fare cap
 */
export const POST = withValidatedBody(FareCapsCreateSchema, async body => {
  const fareCap = await createFareCap(body)
  return Response.json(fareCap)
})
