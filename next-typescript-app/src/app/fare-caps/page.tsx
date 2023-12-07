"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

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
  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <div className="pb-2 flex justify-end">
        <Button>Add Fare Caps</Button>
      </div>
      <div>
        <DataTable columns={columns} data={sampleData} />
      </div>
    </div>
  )
}
