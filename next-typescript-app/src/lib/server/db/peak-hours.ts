import { prisma } from "@/lib/server/db/client"

export async function getPeakHours() {
  const hrs = await prisma.peakHour.findMany()
}
