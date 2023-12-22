"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useRestApi } from "@/lib/api/rest-client"
import { ColumnDef } from "@tanstack/react-table"
import type { Trip } from "@prisma/client"

const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
  timeStyle: "medium",
})

const columns = [
  {
    header: "Time",
    accessorKey: "date",
    cell: props => formatter.format(new Date(props.getValue() as string)),
  } satisfies ColumnDef<Trip>,
  { header: "Customer", accessorKey: "customer.name" },
  { header: "From", accessorKey: "from" },
  { header: "To", accessorKey: "to" },
]

export default function TripsPage() {
  const trips = useRestApi<Trip>("/api/v1/trips?expand=customer")

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
