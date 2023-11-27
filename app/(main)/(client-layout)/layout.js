"use client"

import { ClientLayout, RefreshTokenHandler } from "components";

export default function Layout({ children }) {
  return (
    <>
      <ClientLayout>
        {children}
      </ClientLayout>
      <RefreshTokenHandler />
    </>
  )
}
