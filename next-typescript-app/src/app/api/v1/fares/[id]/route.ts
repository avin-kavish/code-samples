/**
 * Get single fare
 * @constructor
 */
export default function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
}

export const dynamic = "force-dynamic"
