"use client"
import type { Customer } from "@prisma/client"

import { DataTable } from "@/components/ui/data-table"
import { useRestApi } from "@/lib/api/rest-client"
import { NewCustomerDialog } from "./_components/new-customer-dialog"
import { useRouter } from "next/navigation"

const columns = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
]

export default function CustomersPage() {
  const customers = useRestApi<Customer, bigint>("/api/v1/customers")

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
          editRoute={id => `/customers/${id}/edit`}
        />
      </div>
    </div>
  )
}
