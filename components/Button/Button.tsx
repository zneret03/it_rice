'use client'

interface ButtonTypes {
  variant: 'default' | 'primary' | 'secondary' | 'transparent'
  title: string
  customStyle?: string
}

export const Button = ({
  variant,
  title,
  customStyle,
  ...rest
}: ButtonTypes): JSX.Element => {
  const buttonVariants: { [key: string]: string } = {
    primary: 'bg-green-900 text-green-900',
    secondary: 'bg-green-300 text-white',
    transparent: 'bg-transparent text-green-100 border border-green-100'
  }

  return (
    <button
      {...rest}
      className={`${variant !== 'default' ? `font-light ${customStyle} ${buttonVariants[variant]} rounded-[0.375rem] px-8 py-2 hover:opacity-60` : customStyle}`}
    >
      {title}
    </button>
  )
}
