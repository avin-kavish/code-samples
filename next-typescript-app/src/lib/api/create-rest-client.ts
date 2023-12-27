import useSWR from "swr"
import { API_BASE } from "@/lib/settings"
import axios from "axios"
import { useMemo } from "react"

export type IDType = number | bigint | string

type IdType<T> = T extends { id: infer R } ? R : never

export function createRestApi<
  TData extends { id: IDType },
  TCreate = Omit<TData, "id">,
  TUpdate = Omit<TData, "id">,
>(
  path: string,
  { params: defaultParams }: { params?: Record<string, any> } = {},
) {
  type Id = IdType<TData>

  function useRestApi({ params }: { params?: Record<string, any> } = {}) {
    const searchParams = new URLSearchParams({ ...params, ...defaultParams })

    const { data, error, isLoading, isValidating, mutate } = useSWR<TData[]>(
      `${API_BASE}${path}?${searchParams}`,
      (path: string) => axios.get(path).then(res => res.data),
    )

    return useMemo(
      () => ({
        data: data,
        error,
        isLoading,
        isValidating,
        async create(data: TCreate) {
          const res = await axios.post<TData>(
            `${API_BASE}${path}?${searchParams}`,
            data,
          )
          mutate(
            currentData => {
              return [...(currentData ?? []), res.data]
            },
            { revalidate: false },
          )
        },
        async update(id: Id, data: TUpdate) {
          const res = await axios.post<TData>(
            `${API_BASE}${path}/${id}?${searchParams}`,
            data,
          )
          mutate(
            currentData => {
              return currentData?.map(c => {
                if (c.id === id) {
                  return res.data
                }
                return c
              })
            },
            { revalidate: false },
          )
        },
        async delete(id: Id) {
          await axios.delete(`${API_BASE}/${path}/${id}`)
          mutate(
            currentData => {
              return currentData?.filter(c => c.id !== id)
            },
            { revalidate: false },
          )
        },
      }),
      [data, error, isLoading, isValidating, mutate, searchParams],
    )
  }

  return [useRestApi]
}
