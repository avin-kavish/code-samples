import useSWR from "swr"
import { API_BASE } from "@/lib/settings"
import axios from "axios"

export interface RestApi<
  TData extends { id: Id },
  Id extends number | bigint | string,
> {
  data: TData[] | undefined
  error: any
  isLoading: boolean
  isValidating: boolean
  create: (data: Omit<TData, "id">) => Promise<void>
  update: (id: Id, data: Omit<TData, "id">) => Promise<void>
  delete: (id: Id) => Promise<void>
}

export function useRestApi<
  TData extends { id: Id },
  Id extends number | bigint | string,
>(path: string): RestApi<TData, Id> {
  const { data, error, isLoading, isValidating, mutate } = useSWR<TData[]>(
    API_BASE + path,
    (path: string) => axios.get(path).then(res => res.data),
  )

  return {
    data: data,
    error,
    isLoading,
    isValidating,
    async create(data) {
      const res = await axios.post<TData>(path, data)
      mutate(currentData => {
        return [...(currentData ?? []), res.data]
      })
    },
    async update(id, data) {
      mutate(currentData => {
        return currentData?.filter(c => c.id !== id)
      })
      const res = await axios.post(`${path}/${id}`, data)
    },
    async delete(id) {
      mutate(currentData => {
        return currentData?.filter(c => c.id !== id)
      })
      await axios.delete(`${path}/${id}`)
    },
  }
}
