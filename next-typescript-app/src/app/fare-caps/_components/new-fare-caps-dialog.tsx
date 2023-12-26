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
import { FareCapsForm } from "./fare-caps-form"
import { FareCapsApi } from "@/lib/api/rest"

export function NewFareCapsDialog({
  create,
}: {
  create: FareCapsApi["create"]
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
