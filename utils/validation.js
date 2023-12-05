import * as Yup from 'yup'

export const logInSchema = Yup.object().shape({
  email: Yup.string().required('账户邮箱必填').email('请输入正确邮箱'),
  password: Yup.string().required('请输入登录密码').min(6, '密码长度最小6位'),
})
