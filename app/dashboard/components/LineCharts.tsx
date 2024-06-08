import { useMemo } from 'react'
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer
} from 'recharts'
import { useFetchData } from '@/lib'

interface TrendsTypes {
  irrigated: number[]
  irrigated_trend: number[]
  rainfeed: number[]
  rainfeed_trend: number[]
  month: string[]
}

interface FormatDataTypes {
  irrigated: number
  'irrigated trend': number
  rainfeed: number
  'rainfeed trend': number
  month: string
}

const roundOfFunction = (number: Number) =>
  Math.round(Number(number) * 100) / 100

const formatData = (
  irrigated: number[],
  irrigated_trend: number[],
  rainfeed: number[],
  rainfeed_trend: number[],
  months: string[]
): FormatDataTypes[] => {
  return months?.map((month, index) => ({
    irrigated: roundOfFunction(irrigated[index]),
    'irrigated trend': roundOfFunction(irrigated_trend[index]),
    rainfeed: roundOfFunction(rainfeed[index]),
    'rainfeed trend': roundOfFunction(rainfeed_trend[index]),
    month: month
  }))
}
export const LineCharts = (): JSX.Element => {
  const { fetchData } = useFetchData<TrendsTypes>(
    '/api/dashboard/trend?year=2023'
  )

  const { irrigated, irrigated_trend, rainfeed, rainfeed_trend, month } =
    fetchData as TrendsTypes

  const formattedData = useMemo(
    () =>
      formatData(irrigated, irrigated_trend, rainfeed, rainfeed_trend, month),
    [irrigated, irrigated_trend, rainfeed, rainfeed_trend, month]
  )

  return (
    <section className='mt-28 w-full rounded-lg bg-white shadow-xl'>
      <div className='py-6'>
        <h1 className='text-2xl font-bold text-green-900'>
          Trends in Rice Production
        </h1>
      </div>
      <ResponsiveContainer height='100%' width='100%' minHeight='500px'>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Line type='monotone' dataKey='irrigated' stroke='#8884d8' />
          <Line type='monotone' dataKey='irrigated trend' stroke='#82ca9d' />
          <Line type='monotone' dataKey='rainfeed' stroke='#8884d8' />
          <Line type='monotone' dataKey='rainfeed trend' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
