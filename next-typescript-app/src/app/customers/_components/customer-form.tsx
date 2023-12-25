import { ReactNode } from "react"
import { CustomerCreateSchema } from "@/lib/schema"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface CustomerFormProps {
  footer: ReactNode
  onSubmit: (data: CustomerCreateSchema) => Promise<void>
  initialValues?: CustomerCreateSchema
}

export function CustomerForm({
  initialValues,
  footer,
  onSubmit,
}: CustomerFormProps) {
  const form = useForm({ defaultValues: initialValues ?? { name: "" } })

  return (
    <form
      onSubmit={form.handleSubmit(async data => {
        await onSubmit(data)
        form.reset()
      })}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" className="col-span-3" {...form.register("name")} />
        </div>
      </div>
      {footer}
    </form>
  )
}
