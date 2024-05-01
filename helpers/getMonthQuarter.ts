import { ProductionTypes } from '@/lib'

export const monthQuarter = (productions: ProductionTypes[]) =>
  productions.map((production) => {
    return {
      ...production,
      quarter: new Date(production.dateCreated).getMonth() / 3 + 1
    }
  })
