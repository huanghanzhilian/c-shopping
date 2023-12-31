'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { HandleResponse, LoginForm } from '@/components'

import { useLoginMutation } from '@/store/services'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userLogin, showAlert } from '@/store'

export default function LoginPage() {
  //? Assets
  const dispatch = useDispatch()
  const { push } = useRouter()

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

  //? Handle Login User Response
  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.user.root || data?.data?.user.role === 'admin') {
        dispatch(userLogin(data?.data.token))

        dispatch(
          showAlert({
            status: 'success',
            title: data.message,
          })
        )
        push('/admin')
      } else {
        dispatch(
          showAlert({
            status: 'error',
            title: '您无权访问管理面板',
          })
        )
      }
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError && error)
      dispatch(
        showAlert({
          status: 'error',
          title: error?.data?.message,
        })
      )
  }, [isError])

  return (
    <>
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
        </section>

        <div className="fixed max-w-xs px-2 py-3 bg-white border rounded-lg shadow-lg top-5 right-5">
          <h5 className="mb-2 text-amber-600">
            您可以使用下面的电子邮件地址和密码来查看管理仪表板。
          </h5>
          <div className="text-left">
            <span className="text-sm text-zinc-500">Email: admin@gmail.com</span>
            <br />
            <span className="text-sm text-zinc-500">Password: 123456</span>
          </div>
        </div>
      </main>
    </>
  )
}
