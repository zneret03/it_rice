import { Dispatch, SetStateAction } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

interface PaginationTypes {
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
  totalPage?: number
}

export const Pagination = ({
  setCurrentPage,
  currentPage,
  totalPage
}: PaginationTypes): JSX.Element => {
  const isDisabledNext = currentPage === totalPage
  const isDisabledPrevious = currentPage === 1

  const onNextOrPrevious = (type: 'next' | 'previous'): void => {
    if (type === 'next') {
      setCurrentPage((prevState) => prevState + 1)
      return
    }

    setCurrentPage((prevState) => prevState - 1)
  }

  return (
    <div className='flex items-center p-4'>
      <button
        onClick={() => onNextOrPrevious('previous')}
        disabled={isDisabledPrevious}
        className={`${isDisabledPrevious ? 'cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100'}`}
      >
        <ChevronLeft />
      </button>
      <span className='rounded-lg border border-2 border-green-900 bg-green-900 px-2 text-white'>
        {currentPage}
      </span>
      <button
        onClick={() => onNextOrPrevious('next')}
        disabled={isDisabledNext}
        className={`${isDisabledNext ? 'cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100'}`}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
