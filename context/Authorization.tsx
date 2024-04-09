'use client'

import {
  ReactNode,
  useEffect,
  createContext,
  useReducer,
  Dispatch
} from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

interface InitialStateTypes {
  email: string
  password: string
}

const initialState: InitialStateTypes = {
  email: '',
  password: ''
} as const

type ActionType = 'login' | 'logout'

interface DispatchType {
  type: ActionType
  payload?: InitialStateTypes
}

interface AuthorizationTypes {
  cookies: string
  state: InitialStateTypes
  dispatch: Dispatch<DispatchType> | null
}

export const AuthorizationContext = createContext<AuthorizationTypes>({
  cookies: '',
  state: initialState,
  dispatch: null
})

const isWindow = typeof window !== 'undefined'

const reducer = (
  state: InitialStateTypes,
  actions: DispatchType
): InitialStateTypes => {
  switch (actions.type) {
    case 'login':
      return { ...state, ...actions.payload }
    case 'logout':
      return { ...state, ...initialState }
    default: {
      return { ...state, ...initialState }
    }
  }
}

export const AuthorizationProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const authToken = getCookie('session')
  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (authToken && state.email) {
      router.push('/admin')
      return
    }

    router.push('/login')
  }, [authToken, isWindow, router, state])

  return (
    <AuthorizationContext.Provider
      value={{ cookies: authToken as string, state, dispatch }}
    >
      {children}
    </AuthorizationContext.Provider>
  )
}
