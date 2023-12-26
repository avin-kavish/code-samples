import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RestApi } from "@/lib/api/types"
import { useCustomersApi } from "@/lib/api/rest"

function toLabel(customer: RestApi.Customer) {
  return `${customer.id} - ${customer.name}`
}

interface CustomerPickerProps {
  value?: number
  onValueChange: (id: number | null) => void
}

export function CustomerPicker({ value, onValueChange }: CustomerPickerProps) {
  const [open, setOpen] = React.useState(false)

  const { data } = useCustomersApi()

  const current = data?.find(c => c.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="default"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            current && toLabel(current)
          ) : (
            <span className="text-muted-foreground">Select customer...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No customers found.</CommandEmpty>
          <CommandGroup>
            {data?.map(customer => (
              <CommandItem
                key={customer.id}
                value={String(customer.id)}
                onSelect={currentValue => {
                  onValueChange(+currentValue === value ? null : +currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === customer.id ? "opacity-100" : "opacity-0",
                  )}
                />
                {toLabel(customer)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
