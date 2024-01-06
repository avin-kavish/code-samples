import { Fare } from "@prisma/client"
import { listFares } from "@/lib/server/db/fares"
import { builder } from "./schema-builder"

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
