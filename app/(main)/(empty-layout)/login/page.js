'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { usePostDataMutation } from 'store/slices/fetchApiSlice'
import { DisplayError, Loading } from 'components'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from 'store/slices/userSlice'
import alert from 'utils/alert'

//? Validation Schema
const schema = Yup.object().shape({
  email: Yup.string().required('必须输入电子邮件地址').email('输入的电子邮件地址无效'),
  password: Yup.string().required('需要记录密码').min(6, '密码必须多于5个矢量'),
})

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  //? Post query
  const [postData, { data, isSuccess, isError, isLoading, error }] = usePostDataMutation()
  console.log('test')
  //? Handle Response
  useEffect(() => {
    if (isSuccess) {
      console.log('data', data)
      alert('success', data.message)
      dispatch(userLogin(data.data.token))
      reset()
      router.push('/')
    }
    if (isError) alert('error', error?.data.err)
  }, [isSuccess, isError])

  //? Form Hook
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  //? Handlers
  const submitHander = async ({ email, password }) => {
    if (email && password) {
      await postData({
        url: '/api/auth/login',
        body: { email, password },
        token: '',
      })
    }
  }
  return (
    <div className="grid items-center min-h-screen ">
      <div className="container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
        <div className="relative w-44 h-24 mx-auto">
          <Link passHref href="/">
            <Image src="/images/logo.svg" layout="fill" />
          </Link>
        </div>
        <h2>登录</h2>
        <form className="space-y-5" onSubmit={handleSubmit(submitHander)}>
          <div>
            <input
              className="input"
              type="text"
              placeholder="电子邮件地址"
              {...register('email')}
            />
            <DisplayError errors={formErrors.email} />
          </div>

          <div>
            <input className="input" type="password" placeholder="密码" {...register('password')} />
            <DisplayError errors={formErrors.password} />
          </div>

          <button className="btn mx-auto w-60" type="submit" disabled={isLoading}>
            {isLoading ? <Loading /> : '登录'}
          </button>
        </form>

        <div>
          <p className="inline ml-2">你还没有注册</p>
          <Link href="/register">
            <span className="text-blue-400 text-lg ">注册</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
