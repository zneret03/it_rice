'use client'

import { useContext, useEffect, useState } from 'react'
import { ModalContext } from '@/context'
import { useFetchData, usePaginationAction } from '@/lib'
import { useSearchParams } from 'next/navigation'
import { Wrapper, Button, Pagination } from '@/components'
import swal from 'sweetalert2'
import axios from 'axios'

interface UsersTypes {
  id: number
  email: string
  name: string
  role: string
}

const Page = (): JSX.Element => {
  const { dispatch } = useContext(ModalContext)
  const { fetchData } = useFetchData<UsersTypes[]>('/api/users?page=1')
  const [userData, setUserData] = useState<UsersTypes[]>([])

  const params = useSearchParams()
  const emailParams = params.get('email')

  useEffect(() => {
    setUserData(fetchData)
  }, [fetchData])

  const { currentItems, nextPage, previousPage, currentPage, totalPages } =
    usePaginationAction<UsersTypes>(userData)


  const onOpenModal = (): void =>
    dispatch?.({ type: 'open-modal', payload: { isOpen: true } })

  const deleteUser = async (id: number): Promise<void> => {
    const response = await swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      title: 'Are you sure?',
      text: 'are you sure you want to delete this?',
      icon: 'warning'
    })

    if (response.isConfirmed) {
      await axios.delete(`/api/users/${id}`)

      //update the existing data
      const data = userData?.filter((user) => user?.id !== id)
      setUserData(data)
      return
    }

    swal.fire({
      title: 'Cancelled',
      text: 'successfully cancelled delete.',
      icon: 'success'
    })
  }

  return (
    <section className='mt-24'>
      <Wrapper>
        <div className='mt-4 rounded-lg bg-white shadow-lg'>
          <div className='flex items-center justify-between px-6 pt-6 text-green-900'>
            <h1 className='text-2xl font-bold'>Manage Users Account</h1>
            <Button
              title='Create new user'
              type='submit'
              variant='secondary'
              onClick={onOpenModal}
            />
          </div>
          <table className='mt-4 w-full'>
            <thead className='flex justify-between border-b-2 border-t-2'>
              <th className='my-2 flex-1 text-lg font-normal'>Email</th>
              <th className='my-2 flex-1 text-lg font-normal'>Name</th>
              <th className='my-2 flex-1 text-lg font-normal'>Role</th>
              <th className='my-2 flex-1 text-lg font-normal'>Action</th>
            </thead>
            <tbody>
              {currentItems?.map(({ email, name, role, id }, index) => (
                <tr
                  className='align-center flex border-b-2 text-center'
                  key={index}
                >
                  <td className='my-2 flex-1'>{email}</td>
                  <td className='my-2 flex-1'>{name}</td>
                  <td className='my-2 flex-1'>
                    {index === 0 ? 'super admin' : role}
                  </td>
                  <td className='my-2 flex-1 space-x-2'>
                    {emailParams === 'admin@email.com' && (
                      <>
                        <Button title='Edit' variant='primary' />
                        <Button
                          title='Delete'
                          variant='secondary'
                          onClick={() => deleteUser(id)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}

              {userData?.length === 0 && (
                <h1 className='py-4 text-center font-bold text-green-900/40'>
                  Empty table
                </h1>
              )}
            </tbody>
          <div className='float-right'>
            <Pagination
              nextPage={nextPage}
              previousPage={previousPage}
              currentPage={currentPage}
              totalPage={totalPages}
            />
          </div>
          </table>
        </div>
      </Wrapper>
    </section>
  )
}
export default Page
