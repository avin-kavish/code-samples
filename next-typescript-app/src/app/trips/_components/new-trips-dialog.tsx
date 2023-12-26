import { ReactNode, useState } from "react"
import z from "zod"
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
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CustomerPicker } from "@/components/customer-picker"
import { DatePicker } from "@/components/date-picker"
import { TripCreateSchema } from "@/lib/schema"
import { TripsApi } from "@/lib/api/rest"

const TimePickerSchema = z.object({
  hr: z.coerce.number().min(0).max(23),
  min: z.coerce.number().min(0).max(59),
  sec: z.coerce.number().min(0).max(59),
})

const TripFormSchema = z.object({
  date: z.date(),
  time: TimePickerSchema,
  customerId: z.number(),
  from: z.string(),
  to: z.string(),
})
type TripFormSchema = z.infer<typeof TripFormSchema>

interface TripFormProps {
  footer: ReactNode
  onSubmit: (data: TripCreateSchema) => Promise<void>
  initialValues?: {}
}

function TripForm({
  initialValues,
  footer,
  onSubmit: onSubmitProp,
}: TripFormProps) {
  const now = new Date()

  const form = useForm<TripFormSchema>({
    resolver: zodResolver(TripFormSchema),
    defaultValues: initialValues ?? {
      date: now,
      time: {
        hr: now.getHours(),
        min: now.getMinutes(),
        sec: now.getSeconds(),
      },
    },
  })

  const onSubmit = form.handleSubmit(async ({ date, time, ...rest }) => {
    date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.hr,
      time.min,
      time.sec,
    )
    const payload: TripCreateSchema = {
      date: date.toISOString(),
      ...rest,
    }
    await onSubmitProp(payload)
    form.reset()
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="date" className="w-40 text-right">
            Date
          </Label>
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState, formState }) => (
              <DatePicker date={field.value} onDateChange={field.onChange} />
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="time" className="w-40 text-right">
            Time
          </Label>
          <div className="flex w-full gap-3">
            <Input
              type="number"
              min={0}
              max={23}
              placeholder="HH"
              {...form.register("time.hr")}
            />
            <Input
              type="number"
              min={0}
              max={59}
              placeholder="MM"
              {...form.register("time.min")}
            />
            <Input
              type="number"
              min={0}
              max={59}
              placeholder="ss"
              {...form.register("time.sec")}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="customerId" className="w-40 text-right">
            Customer
          </Label>
          <Controller
            name="customerId"
            control={form.control}
            render={({ field, fieldState, formState }) => (
              <CustomerPicker
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="from" className="w-40 text-right">
            From
          </Label>
          <Input id="from" className="" {...form.register("from")} />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="to" className="w-40 text-right">
            To
          </Label>
          <Input id="to" className="" {...form.register("to")} />
        </div>
      </div>
      {footer}
    </form>
  )
}

export function NewTripsDialog({ create }: { create: TripsApi["create"] }) {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Trip</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Trip</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <TripForm
          footer={
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          }
          onSubmit={async data => {
            await create(data)
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
