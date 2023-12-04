'use client'

import { ClientLayout } from 'components'

export default function Layout({ children }) {
  return (
    <>
      <ClientLayout>{children}</ClientLayout>
    </>
  )
}
