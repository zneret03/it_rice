'use client'
import { Wrapper } from '@/components'
import { useFetchData, ProductionTypes } from '@/lib'

const columns = ['Date', 'Rainfeed', 'Irrigated', 'SeedType']

export const Production = (): JSX.Element => {
  const { fetchData } = useFetchData<ProductionTypes>('/api/production?page=1')

  const productions = fetchData

  return (
    <Wrapper>
      <div className='mt-4 rounded-lg bg-white shadow-lg'>
        <div className='px-6 pt-6 text-green-900'>
          <h1 className='text-2xl font-bold'>Production</h1>
        </div>
        <table className='mt-4 w-full'>
          <thead className='flex justify-between border-b-2 border-t-2'>
            {columns.map((col) => (
              <th className='my-2 flex-1 text-lg font-bold'>{col}</th>
            ))}
          </thead>
          <tbody>
            {productions.map(
              ({ dateCreated, rainfeed, irrigated, seedType }) => (
                <tr className='align-center flex border-b-2 text-center'>
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
