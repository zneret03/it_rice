import axios from 'axios'
import { useEffect, useState } from 'react'

interface UseFetchDataTypes<TData> {
  fetchData: TData
  maxPage: number
}

export const useFetchData = <TData>(path: string): UseFetchDataTypes<TData> => {
  const [fetchData, setData] = useState<TData | null>(null)
  const [maxPage, setMaxPage] = useState<number>(0)

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const response = await axios.get(path)

        setData(response.data.data)
        setMaxPage(response.data.maxPage)
      } catch (error) {
        console.error(error)
      }
    }

    getData()
  }, [path])

  return {
    fetchData: fetchData as TData,
    maxPage
  }
}
