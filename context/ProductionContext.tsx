import { ReactNode, createContext, Dispatch, useReducer } from 'react'
import { ProductionTypes } from '@/lib'

type Production = ProductionTypes

const initialState: Production = {
  irrigated: 0,
  rainfeed: 0,
  seedType: '',
  id: 0
}

type ActionType = 'Edit'

interface DispatchType {
  type: ActionType
  payload?: Production
}

interface ProductionContextTypes {
  state: Production
  dispatch: Dispatch<DispatchType> | null
}

export const ProductionContext = createContext<ProductionContextTypes>({
  state: initialState,
  dispatch: null
})

const reducer = (state: Production, action: DispatchType): Production => {
  switch (action.type) {
    case 'Edit':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const ProductionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ProductionContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductionContext.Provider>
  )
}
