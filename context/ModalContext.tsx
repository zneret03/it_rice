import { createContext, ReactNode, useReducer, Dispatch } from 'react'

type ActionType = 'open-modal' | 'close-modal'

interface ModalType {
  isOpen: boolean
}

const initialState: ModalType = {
  isOpen: false
} as const

interface ModalContextType {
  state: typeof initialState
  dispatch: Dispatch<DispatchType> | null
}

interface DispatchType {
  type: ActionType
  payload?: ModalType
}

export const ModalContext = createContext<ModalContextType>({
  state: initialState,
  dispatch: null
})

const reducer = (
  state: typeof initialState,
  action: DispatchType
): typeof initialState => {
  switch (action.type) {
    case 'open-modal':
      return { ...state, ...action.payload }
    case 'close-modal':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const ModalProvider = ({
  children
}: {
  children: ReactNode
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  )
}
