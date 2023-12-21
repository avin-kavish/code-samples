"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useRestApi } from "@/lib/api/rest-client"

const columns = [
  { header: "From", accessorKey: "from" },
  { header: "To", accessorKey: "to" },
  { header: "Daily Cap", accessorKey: "dailyCap" },
  { header: "Weekly Fare", accessorKey: "weeklyCap" },
]

const sampleData = [
  {
    id: "1",
    from: "Green",
    to: "Red",
    dailyCap: 20,
    weeklyCap: 60,
  },
]

export default function FareCapsPage() {
  const fareCaps = useRestApi("/api/v1/fare-caps")

  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <div className="pb-2 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">Fare Caps</h2>
        </div>
        <Button>Add Fare Cap</Button>
      </div>
      <div>
        <DataTable columns={columns} data={fareCaps.data ?? []} />
      </div>
    </div>
  )
}
