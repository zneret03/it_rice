'use client'

import { useForm } from 'react-hook-form'
import { useValidation } from '@/lib/hooks'
import { InputField, Button, Checkbox } from '@/components'

interface LoginTypes {
  email: string
  password: string
  rememberMe: boolean
}

const Page = (): JSX.Element => {
  const { validate } = useValidation()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginTypes>({
    defaultValues: {
      rememberMe: false
    }
  })

  const onSubmit = (data: LoginTypes): void => {
    console.log(data)
  }

  return (
    <section
      className='flex h-screen items-center justify-center bg-black/50 bg-cover bg-no-repeat bg-blend-overlay'
      style={{
        backgroundImage: `url('/images/farmer.png')`
      }}
    >
      <div className='w-2/6 space-y-6 rounded-lg bg-white py-10'>
        <h1 className='text-center text-3xl font-extrabold text-green-900'>
          Welcome to ITrice
        </h1>
        <form className='space-y-6 px-10' onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label='Email'
            type='text'
            placeholder='Enter your email...'
            hasError={!!errors.email}
            errorMessage={errors?.email?.message}
            {...register('email', {
              required: 'Required field.',
              validate: (value) => validate(value)
            })}
          />
          <InputField
            label='Password'
            type='password'
            placeholder='Enter your password...'
            hasError={!!errors.password}
            errorMessage={errors?.password?.message}
            {...register('password', {
              required: 'Required field.'
            })}
          />
          <Checkbox label='Remember me' name='rememberMe' control={control} />
          <Button
            title='Login'
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
