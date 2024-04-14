'use client'

import { useContext } from 'react'
import { AuthorizationContext } from '@/context'
import { Logo, Button } from '@/components'
import { deleteCookie } from 'cookies-next'
import { adminLabels, labels } from './helpers/constants'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const Navbar = (): JSX.Element => {
  const { state, dispatch, cookies } = useContext(AuthorizationContext)
  const router = useRouter()
  const params = useSearchParams()

  const isUserLoggedIn = state.email || cookies || !!params.get('email')

  const hasCookies = isUserLoggedIn ? adminLabels : labels

  const signOut = (): void => {
    dispatch?.({ type: 'logout' })
    router.replace('/login')
    deleteCookie('session')
  }

  return (
    <section className='fixed top-0 z-50 flex w-full items-center justify-between bg-green-900'>
      <Link href='/'>
        <Logo />
      </Link>

      <nav className='flex items-center gap-10 text-white'>
        {hasCookies.map(({ title, path }) => (
          <Link href={path} key={title}>
            <Button
              variant={`${['Login', 'Logout'].includes(title) ? 'secondary' : 'default'}`}
              customStyle='text-sm'
              onClick={title === 'Logout' ? () => signOut() : () => {}}
              title={title}
            />
          </Link>
        ))}
      </nav>
    </section>
  )
}
