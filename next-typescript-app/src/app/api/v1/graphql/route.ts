import { createYoga } from "graphql-yoga"

// Side effect imports to register types
import "@/lib/server/graphql/fare"
import "@/lib/server/graphql/fare-caps"

import { builder } from "@/lib/server/graphql/schema-builder"

const { handleRequest } = createYoga({
  schema: builder.toSchema(),
  graphqlEndpoint: "/api/v1/graphql",
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
