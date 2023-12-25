import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UseRestApi } from "@/lib/api/rest-client"
import { Customer } from "@prisma/client"
import { CustomerForm } from "./customer-form"

export function NewCustomerDialog({
  create,
}: {
  create: UseRestApi<Customer, bigint>["create"]
}) {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Customer</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CustomerForm
          footer={
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          }
          onSubmit={async data => {
            await create(data)
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
