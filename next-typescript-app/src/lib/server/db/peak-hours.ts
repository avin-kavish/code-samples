import { DayOfWeek, PeakHour } from "@prisma/client"
import { prisma } from "@/lib/server/db/client"
import { PeakHoursSchema } from "@/lib/schema"

export type PeakHours = Record<DayOfWeek, { start: string; end: string }[]>

export async function getPeakHours(): Promise<PeakHour[]> {
  return prisma.peakHour.findMany()
}

export async function createPeakHours(
  data: PeakHoursSchema,
): Promise<PeakHour> {
  // todo: validate hours
  return prisma.peakHour.create({ data })
}

export async function updatePeakHours(
  id: number,
  data: PeakHoursSchema,
): Promise<PeakHour> {
  // todo: validate hours
  return prisma.peakHour.update({ where: { id }, data })
}

export async function deletePeakHours(id: number) {
  return prisma.peakHour.delete({ where: { id } })
}
