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
import { FareForm } from "./fare-form"
import { FaresApi } from "@/lib/api/rest"

export function NewFareDialog({ create }: { create: FaresApi["create"] }) {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Fare</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Fare</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FareForm
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
