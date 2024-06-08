import { ChevronLeft, ChevronRight } from 'react-feather'

interface PaginationTypes {
  nextPage: () => void
  previousPage: () => void
  currentPage: number
  totalPage: number
}

export const Pagination = ({
  nextPage,
  previousPage,
  currentPage,
  totalPage
}: PaginationTypes): JSX.Element => {
  const isDisabledNext = currentPage === totalPage
  const isDisabledPrevious = currentPage === 1

  return (
    <div className='flex items-center p-4'>
      <button
        onClick={previousPage}
        disabled={isDisabledPrevious}
        className={`${isDisabledPrevious ? 'cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100'}`}
      >
        <ChevronLeft />
      </button>
      <span className='border border-2 px-2 border-green-900 rounded-lg bg-green-900 text-white'>{currentPage}</span>
      <button
        onClick={nextPage}
        disabled={isDisabledNext}
        className={`${isDisabledNext ? 'cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100'}`}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
