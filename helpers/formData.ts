const roundOfFunction = (number: Number) =>
  Math.round(Number(number) * 100) / 100

export const formatData = (
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

export const splitDataByYear = (data: any): any => {
  const years = data?.year
  const splitResult = []

  years?.forEach((year, index) => {
    splitResult.push({
      name: `${year} trend`,
      irrigated: data.irrigated[index],
      irrigated_trend: data.irrigated_trend[index],
      rainfeed: data.rainfeed[index],
      rainfeed_trend: data.rainfeed_trend[index]
    })
  })

  return splitResult
}
