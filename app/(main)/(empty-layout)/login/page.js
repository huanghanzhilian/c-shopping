'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { HandleResponse, LoginForm } from '@/components'

import { useLoginMutation } from '@/store/services'
import { useDispatch } from 'react-redux'
import { userLogin } from 'store'

export default function LoginPage() {
  //? Assets
  const dispatch = useDispatch()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation()

  //? Handlers
  const submitHander = async ({ email, password }) => {
    if (email && password) {
      await login({
        body: { email, password },
      })
    }
  }
  return (
    <>
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={() => {
            dispatch(userLogin(data.data.token))
            replace(redirectTo || '/')
          }}
        />
      )}
      <main className="grid items-center min-h-screen">
        <section className="container max-w-md px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
          <Link passHref href="/">
            <div className="h-24 mx-auto w-44 bg-red-200"></div>
          </Link>
          <h1>
            <font className="">
              <font>登录</font>
            </font>
          </h1>
          <LoginForm isLoading={isLoading} onSubmit={submitHander} />
          <div className="text-xs">
            <p className="inline mr-2 text-gray-800 text-xs">我还没有账户</p>
            <Link href="/register" className="text-blue-400 text-xs">
              去注册
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
