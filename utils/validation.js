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

export const categorySchema = Yup.object().shape({
  name: Yup.string().required('类别名称不能为空'),
  slug: Yup.string().required('路径名不能为空'),
  image: Yup.string()
    .required('输入图片地址')
    .url('无效的图像地址')
    .matches(/\.(gif|jpe?g|png|webp)$/i, '图像地址必须是有效的图像URL'),
})
