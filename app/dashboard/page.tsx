'use client'
import { LineCharts, ErrigatedProduction, Production } from './components'

const Page = (): JSX.Element => (
  <div className='relative px-16 py-6'>
    <LineCharts />
    <ErrigatedProduction />
    <Production />
  </div>
)

export default Page
