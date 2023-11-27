"use client"

import { Navbar, RefreshTokenHandler } from "components";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <footer>footer</footer>
      <RefreshTokenHandler />
    </>
  )
}
