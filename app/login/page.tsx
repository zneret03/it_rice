const Page = (): JSX.Element => (
  <section
    className='flex h-screen items-center justify-center bg-black/50 bg-cover bg-no-repeat bg-blend-overlay'
    style={{
      backgroundImage: `url('/images/farmer.png')`
    }}
  >
    <div className='w-2/5 rounded-lg bg-white'>
      <h1 className='py-6 text-center text-3xl font-extrabold text-green-900'>
        Welcome to ITrice
      </h1>
      <form></form>
    </div>
  </section>
)

export default Page
