import { DayOfWeek, PeakHour } from "@prisma/client"
import { prisma } from "@/lib/server/db/client"
import z from "zod"

export type PeakHours = Record<DayOfWeek, { start: string; end: string }[]>

export async function getPeakHours(): Promise<PeakHour[]> {
  return prisma.peakHour.findMany()
}

export const PeakHoursSchema = z.object({
  day: z.nativeEnum(DayOfWeek),
  start: z.string(),
  end: z.string(),
})
export type PeakHoursSchema = z.infer<typeof PeakHoursSchema>

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
