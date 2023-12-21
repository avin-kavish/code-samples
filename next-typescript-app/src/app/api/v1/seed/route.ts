import { seedDb } from "@/lib/server/db/seed"
import { jsonResponse } from "@/lib/utils"

export const POST = async (request: Request) => {
  await seedDb()
  return jsonResponse({ success: true })
}
