import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer
} from 'recharts'
import { lineChartData } from '../helpers/constants'

export const LineCharts = (): JSX.Element => {
  return (
    <section className='mt-28 w-full rounded-lg bg-white shadow-xl'>
      <div className='py-6'>
        <h1 className='text-2xl font-bold text-green-900'>
          Trends in Rice Production
        </h1>
      </div>
      <ResponsiveContainer height='100%' width='100%' minHeight='500px'>
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Line type='monotone' dataKey='pv' stroke='#8884d8' />
          <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
