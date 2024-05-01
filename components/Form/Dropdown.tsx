import { useState } from 'react'
import { ChevronDown } from 'react-feather'

interface DropdownTypes {
  options: string[]
  label: string
  activeOptions: string
  setOptions: (option: string) => void
}

export const Dropdown = ({
  options,
  activeOptions,
  label,
  setOptions
}: DropdownTypes): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const onOpen = (): void => setOpen((prevState) => !prevState)

  return (
    <div className='relative'>
      <button
        onClick={onOpen}
        className='inline-flex items-center rounded-lg border-2 border-green-900 bg-white px-5 py-2.5 text-center text-sm font-medium text-green-900 hover:bg-green-900 hover:text-white focus:outline-none'
        type='button'
      >
        {activeOptions || label} <ChevronDown className='color-green-900' />
      </button>

      <div
        id='dropdown'
        className={`${isOpen ? 'block' : 'hidden'} w-full text-green absolute top-14 z-10 block divide-y divide-gray-100 rounded-lg bg-white shadow`}
      >
        <ul className='py-2 text-sm text-green-900'>
          {options.map((opt) => (
            <li
              key={opt}
              className='block cursor-pointer px-4 py-2 text-green-900 hover:bg-green-900 hover:text-white'
              onClick={() => {
                setOptions(opt)
                setOpen(false)
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
