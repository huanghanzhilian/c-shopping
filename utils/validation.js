import * as Yup from 'yup'

export const logInSchema = Yup.object().shape({
  email: Yup.string().required('账户邮箱必填').email('请输入正确邮箱'),
  password: Yup.string().required('请输入登录密码').min(6, '密码长度最小6位'),
})

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('请输入账户名称').min(3, '账户名称最小三位'),
  email: Yup.string().required('账户邮箱必填').email('请输入正确邮箱'),
  password: Yup.string().required('请输入登录密码').min(6, '密码长度最小6位'),
  confirmPassword: Yup.string()
    .required('请再次输入确认密码')
    .oneOf([Yup.ref('password'), null], '确认密码有误'),
})
