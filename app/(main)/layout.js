"use client"

import { useEffect, useState } from "react";
import StoreProvider from 'app/StoreProvider'

export default function Layout({ children }) {
  //? Fix Hydration failed
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
}
