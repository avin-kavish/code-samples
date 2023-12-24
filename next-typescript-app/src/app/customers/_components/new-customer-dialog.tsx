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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UseRestApi } from "@/lib/api/rest-client"
import { Customer } from "@prisma/client"
import { useForm } from "react-hook-form"
import { useState } from "react"

export function NewCustomerDialog({
  create,
}: {
  create: UseRestApi<Customer, bigint>["create"]
}) {
  const [isOpen, setOpen] = useState(false)
  const form = useForm({ defaultValues: { name: "" } })

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={form.handleSubmit(async data => {
            await create(data)
            setOpen(false)
            form.reset()
          })}
        >
          <DialogHeader>
            <DialogTitle>New Customer</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...form.register("name")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
