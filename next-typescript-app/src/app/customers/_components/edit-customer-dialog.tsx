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
import { CustomerForm } from "./customer-form"
import { CustomerApi } from "@/lib/api/rest"

export function EditCustomerDialog({
  id,
  initialValues,
  update,
  onDone,
}: {
  id: any
  initialValues: any
  update: CustomerApi["update"]
  onDone: () => void
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <CustomerForm
        initialValues={initialValues}
        footer={
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        }
        onSubmit={async data => {
          await update(id, data)
          onDone()
        }}
      />
    </DialogContent>
  )
}
