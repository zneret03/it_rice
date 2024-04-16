export const ErrigatedProduction = (): JSX.Element => {
  return (
    <div className='mt-4 rounded-lg bg-white shadow-lg'>
      <div className='px-6 pt-6 text-green-900'>
        <h1 className='text-2xl font-bold'>
          Quarterly Rainfeed and Irrigated Prediction
        </h1>
      </div>
      <table className='mt-4 w-full'>
        <thead className='flex justify-between border-b-2 border-t-2'>
          <th className='my-2 flex-1 text-lg font-normal'>Reinfeed</th>
          <th className='my-2 flex-1 text-lg font-normal'>Irrigated</th>
        </thead>
        <tbody>
          <tr className='align-center flex border-b-2 text-center'>
            <td className='my-2 flex-1'>Hello world</td>
            <td className='my-2 flex-1'>Hello world</td>
          </tr>
          <tr className='align-center flex text-center'>
            <td className='my-2 flex-1'>Hello world</td>
            <td className='my-2 flex-1'>Hello world</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
