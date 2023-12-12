"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

const columns = [
  { header: "From", accessorKey: "from" },
  { header: "To", accessorKey: "to" },
  { header: "Peak Fare", accessorKey: "peakFare" },
  { header: "Off Peak Fare", accessorKey: "offPeakFare" },
]

const sampleData = [
  {
    id: "1",
    from: "Green",
    to: "Red",
    peakFare: 8.5,
    offPeakFare: 6,
  },
]

export default function FaresPage() {
  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <div className="pb-2 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">Fares</h2>
        </div>
        <Button>Add Fare</Button>
      </div>
      <div>
        <DataTable columns={columns} data={sampleData} />
      </div>
    </div>
  )
}
