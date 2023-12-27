"use client"
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { PeakHour } from "@prisma/client"
import { TrashIcon } from "lucide-react"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import invariant from "ts-invariant"
import { usePeakHoursApi } from "@/lib/api/rest"
import { PeakHoursSchema } from "@/lib/schema"

type PeakHourItem = PeakHour //{ id: number; start: string; end: string }

const PeakHoursRecordSchema = PeakHoursSchema.extend({ id: z.number() })

const PeakHoursFormSchema = z.object({
  weekday: z.array(PeakHoursRecordSchema),
  saturday: z.array(PeakHoursRecordSchema),
  sunday: z.array(PeakHoursRecordSchema),
})

export default function PeakHoursPage() {
  const peakHours = usePeakHoursApi()

  const form = useForm({
    resolver: zodResolver(PeakHoursFormSchema),
    defaultValues: {
      weekday: [] as PeakHourItem[],
      saturday: [] as PeakHourItem[],
      sunday: [] as PeakHourItem[],
    },
  })

  const weekdayArray = useFieldArray({
    control: form.control,
    name: "weekday",
  })

  const saturdayArray = useFieldArray({
    control: form.control,
    name: "saturday",
  })

  const sundayArray = useFieldArray({
    control: form.control,
    name: "sunday",
  })

  useEffect(() => {
    if (peakHours.data) {
      form.reset({
        weekday: peakHours.data.filter(ph => ph.day === "weekday"),
        saturday: peakHours.data.filter(ph => ph.day === "saturday"),
        sunday: peakHours.data.filter(ph => ph.day === "sunday"),
      })
    }
  }, [peakHours.data])

  const segments = [
    ["Weekdays", "weekday", weekdayArray],
    ["Saturday", "saturday", saturdayArray],
    ["Sunday", "sunday", sundayArray],
  ] as const

  const onSubmit = form.handleSubmit(async data => {
    const original = peakHours.data
    invariant(original)
    const originalIds = original.map(d => d.id)

    const newEntries = [...data.weekday, ...data.sunday, ...data.saturday]
    const newIds = newEntries.map(d => d.id)

    // find to delete
    const toDelete = original.filter(o => !newIds.includes(o.id))

    // find to update
    const overlap = original.filter(o => newIds.includes(o.id))
    // todo: detect changes in overlapping ids
    const changes = overlap.reduce((acc, original) => {
      const newEntry = newEntries.find(e => e.id === original.id)
      invariant(newEntry)

      if (newEntry.start !== original.start || newEntry.end !== original.end) {
        acc.push(newEntry)
      }
      return acc
    }, [] as PeakHourItem[])

    // find to add
    const toAdd = newEntries.filter(n => !originalIds.includes(n.id))

    console.log(toDelete, overlap, toAdd)

    await Promise.all([
      ...toDelete.map(d => peakHours.delete(d.id)),
      ...toAdd.map(d => peakHours.create(d)),
      ...changes.map(d => peakHours.update(d.id, d)),
    ])
  }, console.warn)

  const content = peakHours.isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      {segments.map(([title, day, array]) => (
        <div key={day}>
          <h3 className="mb-1 text-base font-medium">{title}</h3>
          <div className="space-y-4">
            {array.fields.map((field, index) => (
              <div key={field.id} className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <label>Start</label>
                    <Input {...form.register(`${day}.${index}.start`)} />
                  </div>
                  <div className="">
                    <label>End</label>
                    <Input {...form.register(`${day}.${index}.end`)} />
                  </div>
                </div>
                <div className="absolute right-0 top-0 translate-x-full pl-3 pt-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onPointerDown={() => array.remove(index)}
                  >
                    <TrashIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
            <button
              className="border border-dashed rounded-md text-muted-foreground text-xs p-3 px-4 text-center w-full"
              onPointerDown={() =>
                array.append({
                  id: -1 * Math.random() - 1,
                  day,
                  start: "",
                  end: "",
                })
              }
            >
              Add Peak Hours
            </button>
          </div>
        </div>
      ))}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onPointerDown={() => form.reset()}
        >
          Reset
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </>
  )

  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg">
      <form onSubmit={onSubmit}>
        <div className="space-y-6 pr-8">
          <div>
            <h2 className="text-lg font-semibold">Peak Hours</h2>
          </div>
          {content}
        </div>
      </form>
    </div>
  )
}
