import { yupResolver } from '@hookform/resolvers/yup'
import { LoginBtn, TextField } from '@/components'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { logInSchema } from 'utils'

const LoginForm = props => {
  //? Props
  const { isLoading, onSubmit } = props

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setFocus,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: { email: '', password: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('email')
  }, [])

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
      <LoginBtn isLoading={isLoading}>登录</LoginBtn>
    </form>
  )
}

export default LoginForm
