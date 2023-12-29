'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerSchema } from 'utils'

import { TextField, LoginBtn, HandleResponse, RedirectToLogin } from '@/components'

import { useCreateUserMutation } from '@/store/services'
import { useDispatch } from 'react-redux'
import { userLogin } from 'store'

import { useDisclosure } from '@/hooks'

export default function RegisterPage() {
  //? Assets
  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()
  const dispatch = useDispatch()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  //? Create User
  const [createUser, { data, isSuccess, isError, isLoading, error }] = useCreateUserMutation()

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('name')
  }, [])

  //? Handlers
  const submitHander = async ({ name, email, password }) => {
    if (name && email && password) {
      await createUser({
        body: { name, email, password },
      })
    }
  }

  const onError = () => {
    if (error.status === 422) {
      redirectModalHandlers.open()
    }
  }

  const onSuccess = () => {
    dispatch(userLogin(data.data.token))
    reset()
    replace(redirectTo || '/')
  }

  return (
    <>
      <RedirectToLogin
        title="注册异常"
        text={error?.data?.message}
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
      <main className="grid items-center min-h-screen">
        <section className="container max-w-md px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
          <Link passHref href="/">
            <div className="h-24 mx-auto w-44 bg-red-200"></div>
          </Link>
          <h1>
            <font className="">
              <font>注册</font>
            </font>
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(submitHander)} autoComplete="off">
            <TextField
              errors={formErrors.name}
              placeholder="请输入您的账户名称"
              name="name"
              control={control}
            />
            <TextField
              errors={formErrors.email}
              placeholder="请输入您的账户邮箱"
              name="email"
              control={control}
            />

            <TextField
              errors={formErrors.password}
              type="password"
              placeholder="请输入您的账户密码"
              name="password"
              control={control}
            />
            <TextField
              control={control}
              errors={formErrors.confirmPassword}
              type="password"
              placeholder="确认密码，请再次输入"
              name="confirmPassword"
            />
            <LoginBtn isLoading={isLoading}>注册</LoginBtn>
          </form>
          <div className="text-xs">
            <p className="inline mr-2 text-gray-800 text-xs">我已经有账户了</p>
            <Link href="/login" className="text-blue-400 text-xs">
              去登录
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
