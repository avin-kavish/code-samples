"use client"
import { DataTable } from "@/components/ui/data-table"
import { NewCustomerDialog } from "./_components/new-customer-dialog"
import { EditCustomerDialog } from "./_components/edit-customer-dialog"
import { useCustomersApi } from "@/lib/api/rest"

const columns = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
]

export default function CustomersPage() {
  const customers = useCustomersApi()

  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <div className="pb-2 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">Customers</h2>
        </div>
        <NewCustomerDialog create={customers.create} />
      </div>
      <div>
        <DataTable
          columns={columns}
          isLoading={customers.isLoading}
          data={customers.data ?? []}
          delete={customers.delete}
          editDialog={({ id, initialValues, onDone }) => (
            <EditCustomerDialog
              id={id}
              initialValues={initialValues}
              update={customers.update}
              onDone={onDone}
            />
          )}
        />
      </div>
    </div>
  )
}
