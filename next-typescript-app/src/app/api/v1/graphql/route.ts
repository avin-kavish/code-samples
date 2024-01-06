import { createYoga } from "graphql-yoga"
import SchemaBuilder from "@pothos/core"

const builder = new SchemaBuilder({})

builder.queryType({
  fields: t => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || "World"}`,
    }),
  }),
})

const { handleRequest } = createYoga({
  schema: builder.toSchema(),
  graphqlEndpoint: "/api/v1/graphql",
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
