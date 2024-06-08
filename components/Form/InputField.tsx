'use client'

import { forwardRef } from 'react'

interface InputFieldTypes {
  label: string
  hasError?: boolean
  errorMessage?: string
  placeholder?: string
  type?: string
  step?: string
}

type Ref = HTMLInputElement

export const InputField = forwardRef<Ref, InputFieldTypes>(
  function InputField(props, ref) {
    const {
      label,
      hasError,
      errorMessage,
      placeholder,
      type = 'text',
      step,
      ...rest
    } = props

    return (
      <div className='text-dark-primary flex flex-col'>
        <label className='mb-2 text-sm font-semibold text-green-900'>
          {label}
        </label>
        <input
          type={type}
          step={step}
          className={`
            border ${hasError ? 'border-red-500' : 'border-green-200'} 
            rounded-lg border-2
            py-2 pl-4 text-base placeholder-green-200 focus:border-green-900 focus:outline-none focus:ring-0 `}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {hasError && (
          <span className='mt-2 text-xs text-red-500'>{errorMessage}</span>
        )}
      </div>
    )
  }
)
