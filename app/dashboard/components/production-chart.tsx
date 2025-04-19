import { useMemo, useState } from 'react'
import {
  Line,
  LineChart,
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from 'recharts'
import { splitDataByYear, formatData } from '@/helpers'
import { Dropdown } from '@/components'
import { useFetchData } from '@/lib'

interface TrendsTypes {
  irrigated: number[]
  irrigated_trend: number[]
  rainfeed: number[]
  rainfeed_trend: number[]
  month: string[]
  year: string[]
}

interface FormatDataTypes {
  irrigated: number
  'irrigated trend': number
  rainfeed: number
  'rainfeed trend': number
  month: string
}

export const ProductionChart = (): JSX.Element => {
  const today = new Date()

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [activeOptionsYear, setActiveOptionYear] = useState<string>(today.getFullYear())

  const { fetchData } = useFetchData<TrendsTypes>(
    activeIndex === 0
      ? '/api/dashboard/trend/year'
      : `/api/dashboard/trend/month?year=${activeOptionsYear}`
  )

  const { fetchData: getYear } = useFetchData<TrendsTypes>('/api/dashboard/trend/year')

  const chartOptionsYear = getYear?.year

  const [activeOptions, setActiveOption] = useState<string>('All')

  const formattedData = useMemo(() => activeIndex === 0 ? splitDataByYear(fetchData) : (
      formatData(
        fetchData?.irrigated,
        fetchData?.irrigated_trend,
        fetchData?.rainfeed,
        fetchData?.rainfeed_trend,
        fetchData?.month
      ),
  ), [fetchData])

  const filterData = activeOptions === 'All' ? formattedData : formattedData.filter((item) => item.month === activeOptions)

  return (
    <section className='mt-28 w-full rounded-lg bg-white shadow-xl'>
      <div className='flex items-center items-center gap-2 pt-6 pb-4'>
        {['Yearly', 'Monthly'].map((item, index) => (
          <span
            key={item}
            className={`border-b-2 ${activeIndex === index ? 'border-green-500' : 'border-transparent'} cursor-pointer`}
            onClick={() => setActiveIndex(index)}
          >
            {item}
          </span>
        ))}
      </div>

      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-green-900'>
        {activeIndex === 0 ? 'Yearly Production Trend' : 'Monthly Production Chart'}
        </h1>

        {activeIndex === 1 && (
          <div className='flex items-center gap-4'>
        <Dropdown
          label='Filter by month'
          options={fetchData.month as string[]}
          activeOptions={activeOptions as string}
          setOptions={setActiveOption}
          isMonths
        />
        <Dropdown
          label='Filter by year'
          options={chartOptionsYear}
          activeOptions={activeOptionsYear as string}
          setOptions={setActiveOptionYear}
        />
          </div>
        )}
      </div>

      <div className='mt-8'>
      {activeIndex === 0 ? (
        <ResponsiveContainer
          height='100%'
          width='100%'
          minHeight='500px'
        >
          <BarChart width={730} height={250} data={formattedData}>
            <CartesianGrid strokeDasharray='2 2' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='irrigated' fill='#8884d8' />
            <Bar dataKey='irrigated_trend' fill='#82ca9d' />
            <Bar dataKey='rainfeed' fill='#8884d8' />
            <Bar dataKey='rainfeed_trend' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer
          height='100%'
          width='100%'
          minHeight='500px'
          className='mt-4'
        >
        <LineChart data={filterData}>
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
      )}
      </div>
    </section>
  )
}
