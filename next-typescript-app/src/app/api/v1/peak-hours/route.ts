import { getPeakHours } from "@/lib/server/db/peak-hours"

export const dynamic = "force-dynamic"

/**
 * Get peak hours
 * @constructor
 */
export const GET = async (request: Request) => {
  const peakHours = await getPeakHours()
  return Response.json(peakHours)
}

