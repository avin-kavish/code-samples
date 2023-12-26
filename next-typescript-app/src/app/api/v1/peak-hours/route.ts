import { createPeakHours, getPeakHours } from "@/lib/server/db/peak-hours"
import { jsonResponse, withValidatedBody } from "@/lib/utils"
import { PeakHoursSchema } from "@/lib/schema"

export const dynamic = "force-dynamic"

/**
 * Get peak hours
 */
export const GET = async (request: Request) => {
  const peakHours = await getPeakHours()
  return jsonResponse(peakHours)
}

/**
 * Create peak hour
 */
export const POST = withValidatedBody(
  PeakHoursSchema,
  async (body, request, params) => {
    const peakHours = await createPeakHours(body)
    return jsonResponse(peakHours)
  },
)
