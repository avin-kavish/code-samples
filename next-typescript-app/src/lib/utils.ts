import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodType, ZodTypeDef } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseOrRespond<
  Output,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(schema: ZodType<Output, Def, Input>, data: unknown) {
  const input = schema.safeParse(data)
  if (!input.success)
    return Response.json(
      { type: "validation_error", errors: input.error.issues },
      { status: 400 },
    )
  return input.data
}

export function withValidatedBody<Output, T extends Record<string, any>>(
  schema: ZodType<Output>,
  handler: (
    body: Output,
    request: Request,
    params: T,
  ) => Promise<Response | void>,
) {
  return async (request: Request, { params }: { params: T }) => {
    const body = await request.json()

    const input = parseOrRespond(schema, body)
    if (input instanceof Response) return input

    return handler(input, request, params)
  }
}

export function jsonResponse(body: unknown) {
  return new Response(
    JSON.stringify(body, (_, v) => (typeof v === "bigint" ? Number(v) : v)),
    { headers: { "content-type": "application/json" } },
  )
}
