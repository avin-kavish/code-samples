import { builder } from "./schema-builder"
import { CustomerType, TripType } from "./refs"
import { createTrip, listTrips } from "@/lib/server/db/trips"
import { getCustomer } from "@/lib/server/db/customers"
import { TripCreateSchema } from "@/lib/schema"

builder.objectType(TripType, {
  description: "A customer's journey from one line to another",
  fields: t => ({
    id: t.id({ resolve: t => String(t.id) }),
    from: t.exposeString("from"),
    to: t.exposeString("to"),
    date: t.string({ resolve: t => String(t.date) }),
    customer: t.field({
      type: CustomerType,
      resolve: (trip, args, context) => getCustomer(trip.customerId),
    }),
  }),
})

builder.queryFields(t => ({
  trips: t.field({
    type: [TripType],
    resolve: async () => await listTrips(),
  }),
}))

builder.mutationFields(t => ({
  createTrip: t.field({
    type: TripType,
    args: {
      from: t.arg.string({ required: true }),
      to: t.arg.string({ required: true }),
      date: t.arg.string({ required: true }),
      customerId: t.arg.int({ required: true }),
    },
    validate: {
      schema: TripCreateSchema,
    },
    resolve: (parent, args, context) => {
      return createTrip(args)
    },
  }),
}))
