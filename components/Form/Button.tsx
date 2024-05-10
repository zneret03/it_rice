'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonTypes {
  variant: 'default' | 'primary' | 'secondary' | 'transparent'
  title: string
  customStyle?: string
  onClick?: () => void
}

export const Button = ({
  variant,
  title,
  customStyle,
  onClick,
  ...rest
}: ButtonTypes & ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  const buttonVariants: { [key: string]: string } = {
    primary: 'bg-green-900 text-white',
    secondary: 'bg-green-300 text-white',
    transparent: 'bg-transparent text-green-100 border border-green-100'
  }

  return (
    <button
      {...rest}
      onClick={onClick}
      className={`
        ${
          variant !== 'default'
            ? `font-light ${customStyle} 
        ${buttonVariants[variant]}
        rounded-[0.375rem] px-8 py-2 font-semibold hover:opacity-60`
            : customStyle
        }`}
    >
      {title}
    </button>
  )
}
