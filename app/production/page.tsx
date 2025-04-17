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

const Page = (): JSX.Element => {
  const {
    state: { irrigated, rainfeed, seedType, id, dateCreated }
  } = useContext(ProductionContext)

  const defaultDateValue = new Date(dateCreated).toISOString().split('T')[0]

  const searchParams = useSearchParams()
  const router = useRouter()

  const params = searchParams.get('type')
  const paramsEmail = searchParams.get('email')

  const [activeOptions, setActiveOptions] = useState<string>(seedType)

  const isEdit = params === 'edit'

  console.log(defaultDateValue)

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    watch
  } = useForm<ProductionTypes>({
    defaultValues: {
      irrigated,
      rainfeed,
      seedType,
      dateCreated: defaultDateValue
    }
  })

  const watchIrrigated = watch('irrigated')
  const watchRainfeed = watch('rainfeed')

  const setActiveOption = (option: string): void => {
    setActiveOptions(option)
  }

  const onAdd = async (data: ProductionTypes): Promise<void> => {
    const { irrigated, rainfeed, dateCreated } = data

    await axios.post('/api/production', {
      irrigated: Number(irrigated),
      rainfeed: Number(rainfeed),
      seedType: activeOptions || seedType,
      dateCreated: dateCreated
    })

    swal.fire({
      title: 'Success',
      text: 'successfully added production',
      icon: 'success'
    })

    reset({
      irrigated: 0,
      rainfeed: 0
    })

    setActiveOption('')
  }

  const onEdit = async (data: ProductionTypes): Promise<void> => {
    const { irrigated, rainfeed, seedType, dateCreated } = data

    await axios.put(`/api/production/${id}`, {
      irrigated: Number(irrigated),
      rainfeed: Number(rainfeed),
      seedType: activeOptions || seedType,
      dateCreated: dateCreated
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

  const isDisabledButton =
    !!activeOptions && watchIrrigated !== 0 && watchRainfeed !== 0

  return (
    <section className='flex h-screen items-center justify-center bg-green-900/50 bg-cover bg-no-repeat bg-blend-overlay'>
      <div className='w-2/6 space-y-6 rounded-lg bg-white py-10'>
        <h1 className='text-center text-3xl font-extrabold text-green-900'>
          Production Data
        </h1>

        <div className='space-y-6 px-10'>
          <InputField
            label='Irrigated'
            type='number'
            placeholder='Enter your irrigated data...'
            hasError={!!errors.irrigated}
            min='0.00'
            step='0.001'
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
            min='0.00'
            step='0.001'
            errorMessage={errors?.rainfeed?.message}
            {...register('rainfeed', {
              required: 'Required field.'
            })}
          />

          <InputField
            label='Date'
            type='date'
            placeholder='Enter your rainfeed...'
            defaultValues={defaultDateValue}
            hasError={!!errors.dateCreated}
            errorMessage={errors?.dateCreated?.message}
            {...register('dateCreated', {
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
            isDisabled={!isDisabledButton}
            onClick={isEdit ? handleSubmit(onEdit) : handleSubmit(onAdd)}
            customStyle='text-white w-full'
          />
        </div>
      </div>
    </section>
  )
}

export default Page
