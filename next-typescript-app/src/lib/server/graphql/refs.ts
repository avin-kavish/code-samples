import { builder } from "@/lib/server/graphql/schema-builder"
import { Customer, Trip } from "@prisma/client"

export const TripType = builder.objectRef<Trip>("Trip")

export const CustomerType = builder.objectRef<Customer>("Customer")
