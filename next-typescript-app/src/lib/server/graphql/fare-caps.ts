import { builder } from "@/lib/server/graphql/schema-builder"
import { FareCap } from "@prisma/client"
import { listFareCaps } from "@/lib/server/db/fare-caps"

const FareCapType = builder.objectRef<FareCap>("FareCap")

builder.objectType(FareCapType, {
  description: "",
  fields: t => ({
    id: t.id({ resolve: v => String(v.id) }),
    from: t.exposeString("from"),
    to: t.exposeString("to"),
    dailyCap: t.float({ resolve: v => +v.dailyCap }),
    weeklyCap: t.float({ resolve: v => +v.weeklyCap }),
  }),
})

builder.queryFields(t => ({
  fareCaps: t.field({
    type: [FareCapType],
    resolve: async () => await listFareCaps(),
  }),
}))
