import Link from 'next/link'
import { Logo, Button } from '@/components'
import { labels } from './helpers/constants'

export const Footer = (): JSX.Element => (
  <section className='flex items-center justify-between'>
    <Link href='/'>
      <Logo />
    </Link>

    <nav className='flex items-center gap-10 text-white'>
      {labels.map(({ title, path }) => (
        <Link href={path} key={title}>
          <Button variant='default' customStyle='text-xs' title={title} />
        </Link>
      ))}
    </nav>
  </section>
)
