"use client"

import StoreProvider from 'app/StoreProvider'
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <StoreProvider>
      {children}
      <Toaster
        position='top-right'
        toastOptions={{ style: { fontSize: "1rem" } }}
      />
    </StoreProvider>
  )
}
