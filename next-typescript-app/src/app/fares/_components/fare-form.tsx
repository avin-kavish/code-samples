import { useForm } from "react-hook-form"
import { FareCreateSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ReactNode } from "react"
import { ApiFare } from "@/lib/api/types"

interface FareFormProps {
  footer: ReactNode
  onSubmit: (data: Omit<ApiFare, "id">) => Promise<void>
  initialValues?: FareCreateSchema
}

const fields: [keyof FareCreateSchema, string][] = [
  ["from", "From"],
  ["to", "To"],
  ["peakFare", "Peak Fare"],
  ["offPeakFare", "Off Peak Fare"],
]

export function FareForm({
  initialValues,
  footer,
  onSubmit: onSubmitProp,
}: FareFormProps) {
  const form = useForm<FareCreateSchema>({
    resolver: zodResolver(FareCreateSchema),
    defaultValues: initialValues,
  })

  const onSubmit = form.handleSubmit(async data => {
    await onSubmitProp({
      ...data,
      peakFare: String(data.peakFare),
      offPeakFare: String(data.offPeakFare),
    })
    form.reset()
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        {fields.map(field => (
          <div key={field[0]} className="flex items-center gap-4">
            <Label htmlFor={field[0]} className="w-40 text-right">
              {field[1]}
            </Label>
            <Input id={field[0]} className="" {...form.register(field[0])} />
          </div>
        ))}
      </div>
      {footer}
    </form>
  )
}
