import { useState } from "react"

interface UsePaginationTypes<TData> {
  currentItems: TData[],
  totalPages: number
  nextPage: () => void
  previousPage: () => void
  currentPage: number
}

export const usePaginationAction = <TData>(data: TData[], itemsPerPage = 5): UsePaginationTypes<TData> => {
  const [page, setPage] = useState<number>(1)

  const totalPages = Math.ceil(data?.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = data?.slice(startIndex, endIndex)

  const nextPage = (): void => {
    setPage((prevState) => prevState + 1)
  }

  const previousPage = (): void => {
    setPage((prevState) => prevState - 1)
  }

  return {
    currentItems,
    totalPages,
    nextPage,
    previousPage,
    currentPage: page
  }
}
