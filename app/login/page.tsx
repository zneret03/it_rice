'use client'

import { useContext } from 'react'
import { AuthorizationContext } from '@/context'
import { useForm } from 'react-hook-form'
import { useValidation } from '@/lib'
import { InputField, Button, Checkbox } from '@/components'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface LoginTypes {
  email: string
  password: string
  rememberMe: boolean
}

const Page = (): JSX.Element => {
  const { dispatch } = useContext(AuthorizationContext)
  const { validation } = useValidation()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm<LoginTypes>({
    defaultValues: {
      rememberMe: false
    }
  })

  const watchEmail = watch('email')

  const onSubmit = async (data: LoginTypes): Promise<void> => {
    const { email, password, rememberMe } = data
    await axios.post('/api/auth/login', {
      email,
      password,
      remember: rememberMe
    })

    dispatch?.({ type: 'login', payload: { email, password } })
    router.push(`/admin?email=${watchEmail}`)
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
              validate: (value) => validation(value)
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
