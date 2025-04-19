import { useMemo, useState } from 'react'
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer
} from 'recharts'
import { formatData } from '@/helpers'
import { Dropdown } from '@/components'
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

export const LineCharts = (): JSX.Element => {
  const today = new Date()
  const [activeOptions, setActiveOption] = useState<string>(today.getFullYear())

  const { fetchData } = useFetchData<TrendsTypes>(
    `/api/dashboard/trend/month?year=${activeOptions}`
  )

  const { fetchData: getYear } = useFetchData<TrendsTypes>(
    '/api/dashboard/trend/year'
  )

  const chartOptions = getYear?.year

  const formattedData = useMemo(
    () =>
      formatData(
        fetchData?.irrigated,
        fetchData?.irrigated_trend,
        fetchData?.rainfeed,
        fetchData?.rainfeed_trend,
        fetchData?.month
      ),
    [fetchData]
  )

  return (
    <section className='mt-28 w-full rounded-lg bg-white shadow-xl'>
      <div className='flex items-center justify-between py-6'>
        <h1 className='text-2xl font-bold text-green-900'>
          Trends in Rice Production
        </h1>
        <Dropdown
          label='Filter by seedtype'
          options={chartOptions}
          activeOptions={activeOptions as string}
          setOptions={setActiveOption}
        />
      </div>
      <ResponsiveContainer height='100%' width='100%' minHeight='500px'>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Line type='monotone' dataKey='irrigated' stroke='#8884d8' />
          <Line type='monotone' dataKey='irrigated trend' stroke='#8884d8' />
          <Line type='monotone' dataKey='rainfeed' stroke='#82ca9d' />
          <Line type='monotone' dataKey='rainfeed trend' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
