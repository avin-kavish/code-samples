import { UseRestApi } from "@/lib/api/rest-client"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FareForm } from "./fare-form"
import { Button } from "@/components/ui/button"
import { ApiFare } from "@/lib/api/types"

export function EditFareDialog({
  id,
  initialValues,
  update,
  onDone,
}: {
  id: any
  initialValues: Record<string, any> | undefined
  update: UseRestApi<ApiFare, number>["update"]
  onDone: () => void
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Fare</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <FareForm
        initialValues={initialValues as any}
        onSubmit={async data => {
          await update(id, data)
          onDone()
        }}
        footer={
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        }
      />
    </DialogContent>
  )
}
