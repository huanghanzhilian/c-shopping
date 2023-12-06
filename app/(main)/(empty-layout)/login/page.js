'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { logInSchema } from 'utils'

import { Logo, TextField, LoginBtn, HandleResponse } from '@/components'

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

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('email')
  }, [])

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
          error={error?.data?.error}
          message={data?.message}
          onSuccess={() => {
            dispatch(userLogin(data.data.token))
            reset()
            replace(redirectTo || '/')
          }}
        />
      )}
      <main className="grid items-center min-h-screen">
        <section className="container max-w-md px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
          <Link passHref href="/">
            <Logo className="h-24 mx-auto w-44" />
          </Link>
          <h1>
            <font className="">
              <font>登录 | </font>
              <font>登记</font>
            </font>
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(submitHander)} autoComplete="off">
            <TextField
              errors={formErrors.email}
              placeholder="请输入您的账户邮箱"
              name="email"
              control={control}
              type="email"
              inputMode="email"
            />

            <TextField
              errors={formErrors.password}
              type="password"
              placeholder="请输入您的账户密码"
              name="password"
              control={control}
            />
            <LoginBtn isLoading={isLoading}>登录</LoginBtn>
          </form>
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
