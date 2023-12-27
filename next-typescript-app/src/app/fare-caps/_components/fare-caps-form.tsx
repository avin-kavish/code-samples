import { FareCapsCreateSchema } from "@/lib/schema"
import { ReactNode } from "react"
import { RestApi } from "@/lib/api/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const fields: [keyof FareCapsCreateSchema, string][] = [
  ["from", "From"],
  ["to", "To"],
  ["dailyCap", "Daily Cap"],
  ["weeklyCap", "Weekly Cap"],
]

interface FareCapsFormProps {
  footer: ReactNode
  onSubmit: (data: Omit<RestApi.FareCap, "id">) => Promise<void>
  initialValues?: FareCapsCreateSchema
}

export function FareCapsForm({
  initialValues,
  footer,
  onSubmit: onSubmitProp,
}: FareCapsFormProps) {
  const form = useForm<FareCapsCreateSchema>({
    resolver: zodResolver(FareCapsCreateSchema),
    defaultValues: initialValues,
  })

  const onSubmit = form.handleSubmit(async data => {
    await onSubmitProp({
      ...data,
      dailyCap: String(data.dailyCap),
      weeklyCap: String(data.weeklyCap),
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
