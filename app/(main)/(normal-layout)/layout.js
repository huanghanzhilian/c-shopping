"use client"

import { Navbar } from "components";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <footer>footer</footer>
    </>
  )
}
