import { Fare } from "@prisma/client"
import { builder } from "./schema-builder"
import { createFare, listFares } from "@/lib/server/db/fares"
import { FareCreateSchema } from "@/lib/schema"

const FareType = builder.objectRef<Fare>("Fare")

builder.objectType(FareType, {
  description: "Pay the fare!",
  fields: t => ({
    id: t.id({ resolve: v => String(v.id) }),
    from: t.exposeString("from"),
    to: t.exposeString("to"),
    peakFare: t.float({ resolve: v => +v.peakFare }),
    offPeakFare: t.float({ resolve: v => +v.offPeakFare }),
  }),
})

builder.queryFields(t => ({
  fares: t.field({
    type: [FareType],
    resolve: async () => await listFares(),
  }),
}))

builder.mutationFields(t => ({
  createFare: t.field({
    type: FareType,
    args: {
      from: t.arg.string({ required: true }),
      to: t.arg.string({ required: true }),
      peakFare: t.arg.float({ required: true }),
      offPeakFare: t.arg.float({ required: true }),
    },
    validate: {
      schema: FareCreateSchema,
    },
    resolve: async (parent, args, context) => {
      return createFare(args)
    },
  }),
}))
