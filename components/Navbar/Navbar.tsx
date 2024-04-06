import { Logo, Button } from '@/components'
import { labels } from './helpers/constants'
import Link from 'next/link'

export const Navbar = (): JSX.Element => (
  <section className='fixed top-0  flex w-full items-center justify-between bg-green-900'>
    <Link href='/'>
      <Logo />
    </Link>

    <nav className='flex items-center gap-10 text-white'>
      {labels.map(({ title, path }) => (
        <Link href={path} key={title}>
          <Button
            variant={`${title === 'Login' ? 'secondary' : 'default'}`}
            customStyle='text-sm'
            title={title}
          />
        </Link>
      ))}
    </nav>
  </section>
)
