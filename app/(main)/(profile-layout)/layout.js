"use client"

import { ProfileLayout, RefreshTokenHandler } from "components";

export default function Layout({ children }) {
  return (
    <>
      <ProfileLayout>
        {children}
      </ProfileLayout>
      <RefreshTokenHandler />
    </>
  )
}
