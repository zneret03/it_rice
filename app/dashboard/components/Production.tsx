'use client'

import { useState, useEffect, useContext } from 'react'
import { Wrapper, Dropdown, Button, Pagination } from '@/components'
import { ProductionContext } from '@/context'
import { useFetchData, ProductionTypes } from '@/lib'
import { options } from '@/app/production/helpers'
import { useRouter, useSearchParams } from 'next/navigation'
import swal from 'sweetalert2'
import axios from 'axios'

const columns = ['Date', 'Rainfeed', 'Irrigated', 'SeedType', 'Action']

export const Production = (): JSX.Element => {
  const [activeOptions, setActiveOptions] = useState<string>('')
  const [productionData, setProduction] = useState<ProductionTypes[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { dispatch } = useContext(ProductionContext)

  const { fetchData } = useFetchData<ProductionTypes[]>(
    `/api/production?page=${currentPage}&seedType=${activeOptions}`
  )

  const productions = fetchData

  const router = useRouter()
  const params = useSearchParams()

  const setActiveOption = (option: string): void => {
    setActiveOptions(option)
  }

  const deleteProduction = async (id: number): Promise<void> => {
    const response = await swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      title: 'Are you sure?',
      text: 'are you sure you want to delete this?',
      icon: 'warning'
    })

    if (response.isConfirmed) {
      await axios.delete(`/api/production/${id}`)

      //update the existing data
      const data = productionData.filter((production) => production.id !== id)
      setProduction(data)
      return
    }

    swal.fire({
      title: 'Cancelled',
      text: 'successfully cancelled delete.',
      icon: 'success'
    })
  }

  const editProduction = (id: number): void => {
    const foundProduction = productionData.find(
      (production) => production.id === id
    )

    dispatch?.({ type: 'Edit', payload: foundProduction })
    router.replace(`/production?email=${params.get('email')}&type=edit`)
  }

  useEffect(() => {
    setProduction(fetchData)
  }, [fetchData])

  return (
    <Wrapper>
      <div className='mt-4 rounded-lg bg-white shadow-lg' id='production'>
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
            {productions?.map(
              ({ dateCreated, rainfeed, irrigated, seedType, id }, index) => (
                <tr
                  className='align-center flex border-b-2 text-center'
                  key={index}
                >
                  <td className='my-2 flex-1'>{dateCreated}</td>
                  <td className='my-2 flex-1'>{rainfeed}</td>
                  <td className='my-2 flex-1'>{irrigated}</td>
                  <td className='my-2 flex-1 text-left'>{seedType}</td>
                  <td className='my-2 flex flex-1 items-center gap-2'>
                    <Button
                      title='Edit'
                      variant='primary'
                      onClick={() => editProduction(id)}
                    />
                    <Button
                      title='Delete'
                      variant='secondary'
                      onClick={() => deleteProduction(id)}
                    />
                  </td>
                </tr>
              )
            )}

            {productions?.length === 0 && (
              <h1 className='py-4 text-center font-bold text-green-900/40'>
                Empty table
              </h1>
            )}
          </tbody>
          <div className='float-right'>
            {productions?.length !== 0 && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </table>
      </div>
    </Wrapper>
  )
}
