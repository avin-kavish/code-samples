import { useMemo } from "react"
import { EditIcon, TrashIcon } from "lucide-react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { IDType } from "@/lib/api/rest-client"
import Link from "next/link"

interface ActionProps {
  id: IDType
  delete?: (id: any) => Promise<void>
  editRoute?: (id: any) => string
}

function Actions({ id, ...props }: ActionProps) {
  return (
    <div className="flex items-center gap-1">
      {props.editRoute && (
        <Link href={props.editRoute!(id)}>
          <Button size="icon" variant="ghost">
            <EditIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Link>
      )}
      {props.delete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <TrashIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                record.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onPointerDown={async () => {
                  await props.delete!(id)
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

interface DataTableProps<TData, TValue> {
  isLoading: boolean
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  delete?: (id: any) => Promise<void>
  editRoute?: (id: any) => string
}

export function DataTable<TData, TValue>({
  columns: columnsProp,
  isLoading,
  data,
  ...rest
}: DataTableProps<TData, TValue>) {
  const columns = useMemo(() => {
    const newColumns = [...columnsProp]

    if (rest.delete) {
      const actions = {
        id: "actions",
        header: "Actions",
        cell: props => {
          const id = (props.row.original as { id: IDType }).id
          return (
            <Actions id={id} delete={rest.delete} editRoute={rest.editRoute} />
          )
        },
      } satisfies ColumnDef<TData>

      newColumns.push(actions)
    }

    return newColumns
  }, [columnsProp])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {isLoading ? "Loading..." : "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
