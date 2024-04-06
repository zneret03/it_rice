import { Button } from '@/components'
import Link from 'next/link'

interface ContentTypes {
  title: string
  description: string
}

const Content = ({ title, description }: ContentTypes): JSX.Element => (
  <div className='space-y-2 py-6'>
    <h2 className='text-lg'>{title}</h2>
    <p className='w-96 text-sm font-normal'>{description}</p>
  </div>
)

export default function Home() {
  return (
    <main className='mb-10 space-y-28'>
      <section className='mt-36 flex flex-col items-center justify-center space-y-4'>
        <h1 className={`text-5xl font-extrabold text-green-100`}>
          Welcome to ITrice
        </h1>
        <p className='text-green-300'>
          DSS in determing local rice production and consumption
        </p>

        <footer className='flex gap-4'>
          <Link href='/login'>
            <Button variant='secondary' title='Login' />
          </Link>
          <Button variant='transparent' title='Contact us' />
        </footer>
      </section>

      <section>
        <img
          src='/images/farmer.png'
          className='w-full rounded-2xl object-cover'
          alt='farmer'
        />
      </section>

      <section className='bg-green-200' id='about'>
        <div className='space-y-12 py-12'>
          <div className='space-y-8 text-center'>
            <h2 className='text-center text-2xl font-bold text-green-900'>
              About us
            </h2>
            <p>
              “Rice production is one of the aspects that creates an impact for
              rice consumption and is important for the food supply us the
              country and economy. Nowadays. one of the main problems of our
              country is the local rice production. if the rice produced locally
              can sustain the needs for rice consumption of a specific area. It
              is important to monitor specific areas that have sufficient or
              insufficient supply of rice.“
            </p>
          </div>

          <div className='space-y-8'>
            {['mission', 'vision'].map((img) => (
              <div
                key={img}
                className='rounded-lg bg-cover bg-no-repeat p-4 font-bold text-white'
                style={{
                  backgroundImage: `url('/images/${img}.png')`
                }}
              >
                {img === 'mission' && (
                  <Content
                    title='Our Mission'
                    description='To be one of the most reliable source in the field of agriculture, specifically in determining the local rice production and consumption'
                  />
                )}

                {img === 'vision' && (
                  <Content
                    title='Our Vision'
                    description='To produce a system that provides accurate and data-supported results that in decision making process'
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
