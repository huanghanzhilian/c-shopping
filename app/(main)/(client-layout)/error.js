'use client' // Error components must be Client Components

import { Button } from '@/components'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <main className="lg:px-3 container xl:mt-32">
        <div className="py-20 mx-auto space-y-3 text-center w-fit">
          <h5 className="text-xl">{error.name}</h5>
          <p className="text-lg text-red-500">出现异常，请检查您的地址是否有误，或者联系管理员</p>
          <Button
            className="mx-auto"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => {
                console.log('发送异常警报通知到OA系统', error.message)
              }
            }
          >
            通知我们
          </Button>
        </div>
      </main>
    </>
  )
}
