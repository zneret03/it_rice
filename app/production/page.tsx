'use client'

import { useContext, useEffect, useState } from 'react'
import { InputField, Button, Dropdown } from '@/components'
import { ProductionContext } from '@/context'
import { useForm } from 'react-hook-form'
import { ProductionTypes } from '@/lib'
import { options } from './helpers'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import swal from 'sweetalert2'

type AddProductionTypes = Omit<ProductionTypes, 'dateCrated'>


const Page = (): JSX.Element => {
  const {
    state: { irrigated, rainfeed, seedType, id }
  } = useContext(ProductionContext)

  const searchParams = useSearchParams()
  const router = useRouter()

  const params = searchParams.get('type')
  const paramsEmail = searchParams.get('email')

  const [activeOptions, setActiveOptions] = useState<string>('')

  const isEdit = params === 'edit'

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset
  } = useForm<AddProductionTypes>({
    defaultValues: {
      irrigated,
      rainfeed,
      seedType
    }
  })

  const setActiveOption = (option: string): void => {
    setActiveOptions(option)
  }

  const onAdd = async (data: ProductionTypes): Promise<void> => {
    const { irrigated, rainfeed } = data

    await axios.post('/api/production', {
      irrigated: Number(irrigated),
      rainfeed: Number(rainfeed),
      seedType: activeOptions || seedType
    })

    swal.fire({
      title: 'Success',
      text: 'successfully added production',
      icon: 'success'
    })

    reset()
  }

  const onEdit = async (data: ProductionTypes): Promise<void> => {
    const { irrigated, rainfeed, seedType } = data

    await axios.put(`/api/production/${id}`, {
      irrigated: Number(irrigated),
      rainfeed: Number(rainfeed),
      seedType
    })

    swal.fire({
      title: 'Success',
      text: 'successfully updated production',
      icon: 'success'
    })

    reset()
    router.replace(`/dashboard?email=${paramsEmail}`)
  }

  useEffect(() => {
    if (isEdit) {
      reset({
        irrigated,
        rainfeed,
        seedType
      })
    }
  }, [reset, irrigated, rainfeed, seedType])

  return (
    <section className='flex h-screen items-center justify-center bg-green-900/50 bg-cover bg-no-repeat bg-blend-overlay'>
      <div className='w-2/6 space-y-6 rounded-lg bg-white py-10'>
        <h1 className='text-center text-3xl font-extrabold text-green-900'>
          Production Data
        </h1>

        <form
          className='space-y-6 px-10'
          onSubmit={isEdit ? handleSubmit(onEdit) : handleSubmit(onAdd)}
        >
          <InputField
            label='Irrigated'
            type='number'
            placeholder='Enter your irrigated data...'
            hasError={!!errors.irrigated}
            errorMessage={errors?.irrigated?.message}
            {...register('irrigated', {
              required: 'Required field.'
            })}
          />
          <InputField
            label='Rainfeed'
            type='number'
            placeholder='Enter your rainfeed...'
            hasError={!!errors.rainfeed}
            errorMessage={errors?.rainfeed?.message}
            {...register('rainfeed', {
              required: 'Required field.'
            })}
          />

          <Dropdown
            label='Filter by seedtype'
            options={options}
            activeOptions={activeOptions}
            setOptions={setActiveOption}
            customStyles='absolute right-2'
          />
          <Button
            title='Save'
            type='submit'
            variant='secondary'
            customStyle='text-white w-full'
          />
        </form>
      </div>
    </section>
  )
}

export default Page
