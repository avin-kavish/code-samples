import useSWR from "swr"
import { API_BASE } from "@/lib/settings"
import axios from "axios"

export function useRestApi<TData extends { id: number }>(path: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<TData[]>(
    API_BASE + path,
    (path: string) => axios.get(path).then(res => res.data),
  )

  return {
    data: data,
    error,
    isLoading,
    isValidating,
    async create(data: TData) {
      let id = data.id
      mutate(currentData => {
        return [...(currentData ?? []), data]
      })
      const res = await axios.post(path, data)
    },
    async update(id: number) {
      mutate(currentData => {
        return currentData?.filter(c => c.id !== id)
      })
      const res = await axios.post(`${path}/${id}`, data)
    },
    async delete(id: number) {
      mutate(currentData => {
        return currentData?.filter(c => c.id !== id)
      })
      await axios.delete(`${path}/${id}`)
    },
  }
}
