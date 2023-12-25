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
import { useState } from "react"
import { UseRestApi } from "@/lib/api/rest-client"
import { RestApi } from "@/lib/api/types"
import { FareCapsForm } from "./fare-caps-form"

export function NewFareCapsDialog({
  create,
}: {
  create: UseRestApi<RestApi.FareCap, number>["create"]
}) {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Fare Cap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Fare</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FareCapsForm
          onSubmit={async data => {
            await create(data)
            setOpen(false)
          }}
          footer={
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
