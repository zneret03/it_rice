'use client'
import { useState } from 'react'
import { Wrapper, Dropdown, Pagination } from '@/components'
import { useFetchData, ProductionTypes, usePaginationAction } from '@/lib'
import { monthQuarter } from '@/helpers'

export const ErrigatedProduction = (): JSX.Element => {
  const [activeOptions, setActiveOptions] = useState<string>('')
  const { fetchData } = useFetchData<ProductionTypes[]>(
    '/api/production?page=1'
  )

  const productions = monthQuarter(fetchData)

  const quarterlyProduction = productions?.map(
    ({ rainfeed, irrigated, quarter }) => ({
      rainfeed,
      irrigated,
      quarter: Math.floor(quarter as number)
    })
  )

  const filterProduction = quarterlyProduction?.filter(
    ({ quarter }) => quarter === Number(activeOptions)
  )

  const activeProductions =
    filterProduction?.length !== 0 || !activeOptions
      ? quarterlyProduction
      : filterProduction

  const { currentItems, nextPage, previousPage, currentPage, totalPages } =
    usePaginationAction<{
      rainfeed: number
      irrigated: number
      quarter: number
    }>(activeProductions)

  const setActiveOption = (option: string): void => {
    setActiveOptions(option)
  }

  return (
    <Wrapper>
      <div className='mt-4 rounded-lg bg-white shadow-lg'>
        <div className='flex items-center justify-between px-6 pt-6 text-green-900'>
          <h1 className='text-2xl font-bold'>
            Quarterly Rainfeed and Irrigated Prediction
          </h1>
          <Dropdown
            options={['1', '2', '3', '4']}
            activeOptions={activeOptions}
            setOptions={setActiveOption}
            label='Filter by quarter'
          />
        </div>
        <table className='mt-4 w-full'>
          <thead className='flex justify-between border-b-2 border-t-2'>
            <th className='my-2 flex-1 text-lg font-normal'>Reinfeed</th>
            <th className='my-2 flex-1 text-lg font-normal'>Irrigated</th>
          </thead>
          <tbody>
            {currentItems?.map(({ rainfeed, irrigated }, index) => (
              <tr
                className='align-center flex border-b-2 text-center'
                key={index}
              >
                <td className='my-2 flex-1'>{rainfeed}</td>
                <td className='my-2 flex-1'>{irrigated}</td>
              </tr>
            ))}

            {activeProductions?.length === 0 && (
              <h1 className='py-4 text-center font-bold text-green-900/40'>
                Empty table
              </h1>
            )}
          </tbody>
          <div className='float-right'>
          {activeProductions?.length !== 0 && (
            <Pagination
              nextPage={nextPage}
              previousPage={previousPage}
              currentPage={currentPage}
              totalPage={totalPages}
            />
          )}
          </div>
        </table>
      </div>
    </Wrapper>
  )
}
