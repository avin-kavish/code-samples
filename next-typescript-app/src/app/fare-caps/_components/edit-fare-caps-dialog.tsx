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
import { FareCapsForm } from "./fare-caps-form"
import { FareCapsApi } from "@/lib/api/rest"

export function EditFareCapsDialog({
  id,
  initialValues,
  update,
  onDone,
}: {
  id: any
  initialValues: any
  update: FareCapsApi["update"]
  onDone: () => void
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Fare Cap</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <FareCapsForm
        initialValues={initialValues}
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
