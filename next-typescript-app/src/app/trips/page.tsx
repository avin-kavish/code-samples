"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

const columns = [
  { header: "Date", accessorKey: "date" },
  { header: "Customer", accessorKey: "customer" },
  { header: "From", accessorKey: "from" },
  { header: "To", accessorKey: "to" },
]

const sampleData = [
  {
    id: "1",
    from: "Green",
    to: "Red",
    customer: "John",
    date: new Date(),
  },
]

export default function TripsPage() {
  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <div className="pb-2 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">Trips</h2>
        </div>
        <Button>Add Trip</Button>
      </div>
      <div>
        <DataTable columns={columns} data={sampleData} />
      </div>
    </div>
  )
}
