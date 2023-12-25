import useSWR from "swr"
import { API_BASE } from "@/lib/settings"
import axios from "axios"

export type IDType = number | bigint | string

export interface UseRestApi<TData extends { id: Id }, Id extends IDType> {
  data: TData[] | undefined
  error: any
  isLoading: boolean
  isValidating: boolean
  create: (data: Omit<TData, "id">) => Promise<void>
  update: (id: Id, data: Omit<TData, "id">) => Promise<void>
  delete: (id: Id) => Promise<void>
}

export function useRestApi<TData extends { id: Id }, Id extends IDType>(
  path: string,
): UseRestApi<TData, Id> {
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
      mutate(
        currentData => {
          return [...(currentData ?? []), res.data]
        },
        { revalidate: false },
      )
    },
    async update(id, data) {
      const res = await axios.post(`${path}/${id}`, data)
      mutate(
        currentData => {
          return currentData?.map(c => {
            if (c.id === id) {
              return { id, ...data } as TData
            }
            return c
          })
        },
        { revalidate: false },
      )
    },
    async delete(id) {
      await axios.delete(`${path}/${id}`)
      mutate(
        currentData => {
          return currentData?.filter(c => c.id !== id)
        },
        { revalidate: false },
      )
    },
  }
}
