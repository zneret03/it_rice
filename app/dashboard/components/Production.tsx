'use client'
import { useState } from 'react'
import { Wrapper, Dropdown } from '@/components'
import { useFetchData, ProductionTypes } from '@/lib'

const columns = ['Date', 'Rainfeed', 'Irrigated', 'SeedType']

export const Production = (): JSX.Element => {
  const { fetchData } = useFetchData<ProductionTypes>('/api/production?page=1')
  const [activeOptions, setActiveOptions] = useState<string>('')

  const productions = fetchData
  const seedTypes = productions.map(({ seedType }) => seedType)
  const options = [...new Set(seedTypes)]

  const filterProduction = productions.filter(
    ({ seedType }) => seedType === activeOptions
  )

  const setActiveOption = (option: string): void => {
    setActiveOptions(option)
  }

  const activeProductions =
    filterProduction.length === 0 || !activeOptions
      ? productions
      : filterProduction

  return (
    <Wrapper>
      <div className='mt-4 rounded-lg bg-white shadow-lg'>
        <div className='flex items-center justify-between px-6 pt-6 text-green-900'>
          <h1 className='text-2xl font-bold'>Production</h1>
          <Dropdown
            label='Filter by seedtype'
            options={options}
            activeOptions={activeOptions}
            setOptions={setActiveOption}
          />
        </div>
        <table className='mt-4 w-full'>
          <thead className='flex justify-between border-b-2 border-t-2'>
            {columns.map((col) => (
              <th key={col} className='my-2 flex-1 text-lg font-bold'>
                {col}
              </th>
            ))}
          </thead>
          <tbody>
            {activeProductions.map(
              ({ dateCreated, rainfeed, irrigated, seedType }, index) => (
                <tr
                  className='align-center flex border-b-2 text-center'
                  key={index}
                >
                  <td className='my-2 flex-1'>{dateCreated}</td>
                  <td className='my-2 flex-1'>{rainfeed}</td>
                  <td className='my-2 flex-1'>{irrigated}</td>
                  <td className='my-2 flex-1'>{seedType}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}
