"use client"

import { DashboardLayout } from "components";

export default function Layout({ children }) {
  return (
    <>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </>
  )
}
