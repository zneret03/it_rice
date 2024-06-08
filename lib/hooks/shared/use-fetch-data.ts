import axios from 'axios'
import { useEffect, useState } from 'react'

interface UseFetchDataTypes<TData> {
  fetchData: TData
}

export const useFetchData = <TData>(path: string): UseFetchDataTypes<TData> => {
  const [fetchData, setData] = useState<TData | null>(null)

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response = await axios.get(path)

      setData(response.data?.data)
    }

    getData()
  }, [path])

  return {
    fetchData: fetchData as TData
  }
}
