"use client"

import { DashboardLayout, RefreshTokenHandler } from "components";

export default function Layout({ children }) {
  return (
    <>
      <DashboardLayout>
        {children}
      </DashboardLayout>
      <RefreshTokenHandler />
    </>
  )
}
