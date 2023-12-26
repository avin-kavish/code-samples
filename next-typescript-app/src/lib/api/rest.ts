import { createRestApi } from "@/lib/api/create-rest-client"
import { PeakHour, Trip } from "@prisma/client"
import { RestApi } from "@/lib/api/types"
import { TripCreateSchema } from "@/lib/schema"

export const [useTripsApi] = createRestApi<Trip, TripCreateSchema>(
  "/api/v1/trips",
)
export type TripsApi = ReturnType<typeof useTripsApi>

export const [useCustomersApi] =
  createRestApi<RestApi.Customer>("/api/v1/customers")
export type CustomerApi = ReturnType<typeof useCustomersApi>

export const [useFaresApi] = createRestApi("/api/v1/fares")
export type FaresApi = ReturnType<typeof useFaresApi>

export const [useFareCapsApi] =
  createRestApi<RestApi.FareCap>("/api/v1/fare-caps")
export type FareCapsApi = ReturnType<typeof useFareCapsApi>

export const [usePeakHoursApi] = createRestApi<PeakHour>("/api/v1/peak-hours")
export type PeakHoursApi = ReturnType<typeof usePeakHoursApi>
