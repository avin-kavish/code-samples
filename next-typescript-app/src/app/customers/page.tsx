"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useRestApi } from "@/lib/api/rest-client"
import { ColumnDef } from "@tanstack/react-table"
import type { Customer } from "@prisma/client"

const columns = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
]

export default function CustomersPage() {
  const customers = useRestApi<Customer>("/api/v1/customers")

  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <div className="pb-2 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">Customers</h2>
        </div>
        <Button>Add Customer</Button>
      </div>
      <div>
        <DataTable columns={columns} data={customers.data ?? []} />
      </div>
    </div>
  )
}
