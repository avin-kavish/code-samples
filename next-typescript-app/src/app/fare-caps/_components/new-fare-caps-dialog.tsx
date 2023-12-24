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
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseRestApi } from "@/lib/api/rest-client"
import { RestApi } from "@/lib/api/types"
import { FareCapsCreateSchema } from "@/lib/schema"

const fields: [keyof FareCapsCreateSchema, string][] = [
  ["from", "From"],
  ["to", "To"],
  ["dailyCap", "Daily Cap"],
  ["weeklyCap", "Weekly Cap"],
]

export function NewFareCapsDialog({
  create,
}: {
  create: UseRestApi<RestApi.FareCap, number>["create"]
}) {
  const [isOpen, setOpen] = useState(false)
  const form = useForm<FareCapsCreateSchema>({
    resolver: zodResolver(FareCapsCreateSchema),
  })

  const onSubmit = form.handleSubmit(async data => {
    await create({
      ...data,
      dailyCap: String(data.dailyCap),
      weeklyCap: String(data.weeklyCap),
    })
    setOpen(false)
    form.reset()
  })

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Fare Cap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>New Fare</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {fields.map(field => (
              <div className="flex items-center gap-4">
                <Label htmlFor={field[0]} className="w-40 text-right">
                  {field[1]}
                </Label>
                <Input
                  id={field[0]}
                  className=""
                  {...form.register(field[0])}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
;``
