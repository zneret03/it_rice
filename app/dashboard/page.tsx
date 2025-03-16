'use client'
import {
  LineCharts,
  ErrigatedProduction,
  Production,
  ProductionChart
} from './components'

const Page = (): JSX.Element => (
  <div className='relative px-16 py-6'>
    <LineCharts />
    <ProductionChart />
    <ErrigatedProduction />
    <Production />
  </div>
)

export default Page
