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
import { FareCreateSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { RestApi } from "@/lib/api/rest-client"
import { ApiFare } from "@/lib/api/types"

const fields: [keyof FareCreateSchema, string][] = [
  ["from", "From"],
  ["to", "To"],
  ["peakFare", "Peak Fare"],
  ["offPeakFare", "Off Peak Fare"],
]

export function NewFareDialog({
  create,
}: {
  create: RestApi<ApiFare, number>["create"]
}) {
  const [isOpen, setOpen] = useState(false)
  const form = useForm<FareCreateSchema>({
    resolver: zodResolver(FareCreateSchema),
  })

  const onSubmit = form.handleSubmit(async data => {
    await create({
      ...data,
      peakFare: String(data.peakFare),
      offPeakFare: String(data.offPeakFare),
    })
    setOpen(false)
    form.reset()
  })

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Fare</Button>
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
