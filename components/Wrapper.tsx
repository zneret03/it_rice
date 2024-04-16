import { ReactNode, useState, useEffect } from 'react'

export const Wrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return <>{mounted && children}</>
}
