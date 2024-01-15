import { builder } from "./schema-builder"
import { CustomerType, TripType } from "./refs"
import { listTrips } from "@/lib/server/db/trips"
import { listCustomers } from "@/lib/server/db/customers"

builder.objectType(CustomerType, {
  description: "A customer",
  fields: t => ({
    id: t.id({ resolve: v => String(v.id) }),
    name: t.exposeString("name"),
    trips: t.field({
      type: [TripType],
      resolve: async (parent, args, context) => {
        const trips = listTrips({ customerId: parent.id })
        return trips
      },
    }),
  }),
})

builder.queryFields(t => ({
  customers: t.field({
    type: [CustomerType],
    resolve: () => listCustomers(),
  }),
}))
