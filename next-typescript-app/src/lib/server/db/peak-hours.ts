import { DayOfWeek } from "@prisma/client"
import { prisma } from "@/lib/server/db/client"

type PeakHours = Record<DayOfWeek, { start: string; end: string }>

export async function getPeakHours(): Promise<PeakHours> {
  const hrs = await prisma.peakHour.findMany()
  return Object.fromEntries(
    hrs.map(hr => [hr.day, { end: hr.end, start: hr.start }]),
  ) as PeakHours
}
