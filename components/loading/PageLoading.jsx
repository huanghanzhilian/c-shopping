'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { BigLoading } from 'components'

NProgress.configure({ showSpinner: false })

export default function PageLoading() {
  //? Assets
  const pathname = usePathname()
  const searchParams = useSearchParams()

  //? States
  const [loading, setLoading] = useState(false)

  //? Re-Renders
  useEffect(() => {
    setLoading(false)
    NProgress.done()
    return () => {
      setLoading(true)
      NProgress.start()
    }
  }, [pathname, searchParams])

  //? Render(s)
  return (
    loading && (
      <div className="fixed inset-0 z-40 ">
        <div className="grid h-full bg-blue-50/30 place-items-center ">
          <BigLoading />
        </div>
      </div>
    )
  )
}
