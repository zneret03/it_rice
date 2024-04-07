'use client'

import { UseControllerProps, FieldValues, useController } from 'react-hook-form'

type CheckBoxTypes<T extends FieldValues> = UseControllerProps<T> & {
  label: string
}

export const Checkbox = <T extends FieldValues>(
  props: CheckBoxTypes<T>
): JSX.Element => {
  const { control, name, label } = props

  const {
    field: { ref, ...rest }
  } = useController<T>({ control, name })

  return (
    <div className='flex w-full items-center space-x-2'>
      <input
        type='checkbox'
        ref={ref}
        {...rest}
        className='h-5 w-5 cursor-pointer rounded-sm border-green-900 text-green-900 focus:ring-green-900'
      />
      <label className='text-dark-primary text-base font-semibold'>
        {label}
      </label>
    </div>
  )
}
