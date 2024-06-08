'use client'
import { useContext } from 'react'
import { ModalContext } from '@/context'
import { useValidation } from '@/lib'
import { InputField, Button } from '@/components'
import { useForm } from 'react-hook-form'
import swal from 'sweetalert2'
import axios from 'axios'
import { X } from 'react-feather'

interface CreateUserTypes {
  name: string
  email: string
  password: string
}

export const CreateUserModal = (): JSX.Element => {
  const { state, dispatch } = useContext(ModalContext)
  const { validation } = useValidation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<CreateUserTypes>()

  const watchField = watch(['name', 'email', 'password'])

  const isDisabledButton = watchField.findIndex((field) => !field) > -1

  const onClose = (): void =>
    dispatch?.({ type: 'close-modal', payload: { isOpen: false } })

  const onSubmit = async (data: CreateUserTypes): Promise<void> => {
    const { name, email, password } = data
    await axios.post('/api/users', {
      name, 
      email,
      password,
      role: 'admin'
    })

    swal.fire({
      title: 'Success',
      text: 'successfully added production',
      icon: 'success'
    })

    reset()
    onClose()
  }

  return (
    <>
      {state.isOpen ? (
        <section className='absolute top-0 flex h-screen w-full items-center justify-center bg-black/50 bg-cover bg-no-repeat bg-blend-overlay'>
          <div className='relative w-full max-w-2xl rounded-lg bg-white p-10'>
            <header>
              <h1 className='text-2xl font-bold'>Create new user</h1>
              <div className='absolute right-4 top-4'>
                <X className='cursor-pointer' onClick={onClose} />
              </div>
            </header>
            <form className='mt-4 space-y-4' onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label='Name'
                type='text'
                hasError={!!errors.name}
                errorMessage={errors.name?.message}
                {...register('name', {
                  required: 'Required field.'
                })}
              />

              <InputField
                label='Email'
                type='email'
                hasError={!!errors.email}
                errorMessage={errors.email?.message}
                {...register('email', {
                  required: 'Required field.',
                  validate: (value) => validation(value)
                })}
              />

              <InputField
                label='Password'
                type='password'
                hasError={!!errors.password}
                errorMessage={errors.password?.message}
                {...register('password', {
                  required: 'Required field.'
                })}
              />

              <div className='pt-4'>
                <Button
                  title='register'
                  type='submit'
                  isDisabled={isDisabledButton}
                  variant='secondary'
                  customStyle='w-full'
                />
              </div>
            </form>
          </div>
        </section>
      ) : null}
    </>
  )
}
