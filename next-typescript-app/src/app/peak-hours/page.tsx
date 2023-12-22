"use client"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRestApi } from "@/lib/api/rest-client"

export default function PeakHoursPage() {
  const peakHours = useRestApi("/api/v1/peak-hours")

  const form = useForm({})

  return (
    <div className="mt-4 p-4 mx-auto max-w-screen-lg space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Peak Hours</h2>
      </div>
      <div>
        <h3 className="mb-1 text-base font-medium">Weekdays</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label>Start</label>
            <Input {...form.register("weekday.start")} />
          </div>
          <div className="">
            <label>End</label>
            <Input {...form.register("weekday.end")} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-base font-medium">Saturday</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label>Start</label>
            <Input {...form.register("saturday.start")} />
          </div>
          <div className="">
            <label>End</label>
            <Input {...form.register("saturday.end")} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-base font-medium">Sunday</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label>Start</label>
            <Input {...form.register("sunday.start")} />
          </div>
          <div className="">
            <label>End</label>
            <Input {...form.register("sunday.end")} />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Save</Button>
      </div>
    </div>
  )
}
