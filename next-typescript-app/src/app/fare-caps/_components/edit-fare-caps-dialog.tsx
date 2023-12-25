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
import { RestApi } from "@/lib/api/types"
import { FareCapsForm } from "./fare-caps-form"

export function EditFareCapsDialog({
  id,
  initialValues,
  update,
  onDone,
}: {
  id: any
  initialValues: any
  update: UseRestApi<RestApi.FareCap, number>["update"]
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
