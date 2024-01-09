import SchemaBuilder from "@pothos/core"
import ValidationPlugin from "@pothos/plugin-validation"

export const builder = new SchemaBuilder({
  plugins: [ValidationPlugin],
})

builder.queryType({})
