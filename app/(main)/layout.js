'use client'

import { useEffect, useState } from 'react'

// ? Store
import StoreProvider from 'app/StoreProvider'

// ? Conponents
import { PageLoading, Alert } from '@/components'

export default function Layout({ children }) {
  //? Fix Hydration failed
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <StoreProvider>
      {children}
      <Alert />
      <PageLoading />
    </StoreProvider>
  )
}
