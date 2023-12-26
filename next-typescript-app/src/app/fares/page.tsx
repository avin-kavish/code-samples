"use client"
import { DataTable } from "@/components/ui/data-table"
import { NewFareDialog } from "./_components/new-fare-dialog"
import { EditFareDialog } from "@/app/fares/_components/edit-fare-dialog"
import { useFaresApi } from "@/lib/api/rest"

const columns = [
  { header: "From", accessorKey: "from" },
  { header: "To", accessorKey: "to" },
  { header: "Peak Fare", accessorKey: "peakFare" },
  { header: "Off Peak Fare", accessorKey: "offPeakFare" },
]

export default function FaresPage() {
  const fares = useFaresApi()

  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <div className="pb-2 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">Fares</h2>
        </div>
        <NewFareDialog create={fares.create} />
      </div>
      <div>
        <DataTable
          columns={columns}
          isLoading={fares.isLoading}
          data={fares.data ?? []}
          delete={fares.delete}
          editDialog={({ id, initialValues, onDone }) => (
            <EditFareDialog
              id={id}
              initialValues={initialValues}
              update={fares.update}
              onDone={onDone}
            />
          )}
        />
      </div>
    </div>
  )
}
