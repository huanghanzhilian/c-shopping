"use client"

import StoreProvider from 'app/StoreProvider'
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
}
