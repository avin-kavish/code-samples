"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useRestApi } from "@/lib/api/rest-client"

const columns = [
  { header: "Date", accessorKey: "date" },
  { header: "Customer", accessorKey: "customer.name" },
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
  const trips = useRestApi("/api/v1/trips?expand=customer")

  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <div className="pb-2 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">Trips</h2>
        </div>
        <Button>Add Trip</Button>
      </div>
      <div>
        <DataTable columns={columns} data={trips.data ?? []} />
      </div>
    </div>
  )
}
