'use client'

import { InputField, Button } from '@/components'
import { useForm } from 'react-hook-form'

interface ProductionTypes {
  irrigated: number
  rainfeed: number
  seedType: string
}

const Page = (): JSX.Element => {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<ProductionTypes>()

  const onSubmit = (data: ProductionTypes): void => {
    console.log(data)
  }

  return (
    <section className='flex h-screen items-center justify-center bg-green-900/50 bg-cover bg-no-repeat bg-blend-overlay'>
      <div className='w-2/6 space-y-6 rounded-lg bg-white py-10'>
        <h1 className='text-center text-3xl font-extrabold text-green-900'>
          Production Data
        </h1>
        <form className='space-y-6 px-10' onSubmit={handleSubmit(onSubmit)}>
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

          <InputField
            label='SeedType'
            type='text'
            placeholder='Enter your seedType...'
            hasError={!!errors.seedType}
            errorMessage={errors?.seedType?.message}
            {...register('seedType', {
              required: 'Required field.'
            })}
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
