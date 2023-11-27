"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { usePostDataMutation } from "store/slices/fetchApiSlice";
import { useDispatch } from "react-redux";
import { userLogin } from "store/slices/authSlice";

import { DisplayError, Loading } from "components";
import toast from "react-hot-toast";

//? Validation Schema
const schema = Yup.object().shape({
  name: Yup.string()
    .required("需要登记姓氏和姓名")
    .min(3, "姓氏必须是两个以上的因素"),
  email: Yup.string()
    .required("必须输入电子邮件地址")
    .email("输入的电子邮件地址无效"),
  password: Yup.string()
    .required("身份验证所需的密码")
    .min(6, "密码必须多于5个矢量"),
  confirmPassword: Yup.string()
    .required("这是一个再次通过字母表的单词")
    .oneOf([Yup.ref("password"), null], "这个词又不对了"),
});

export default function RegisterPage() {
  const dispatch = useDispatch();

  //? Post query
  const [
    postData,
    { data, isSuccess, isError, isLoading, error },
  ] = usePostDataMutation();

  //? Handle Response
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      dispatch(userLogin(data.data));
      reset();
    }
    if (isError) toast.error(error?.data.err);
  }, [isSuccess, isError]);

  //? Form Hook
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //? Handlers
  const submitHander = async ({ name, email, password, confirmPassword }) => {
    if (name && email && password && confirmPassword) {
      await postData({
        url: "/api/auth/register",
        body: { name, email, password },
        token: "",
      });
    }
  };

  return (
    <div className=' grid items-center min-h-screen '>
      <div className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
        <div className='relative w-44 h-24 mx-auto'>
          <Link passHref href='/'>
            <Image src='/images/logo.svg' layout='fill' />
          </Link>
        </div>
        <h2>需要注册</h2>
        <form className='space-y-5' onSubmit={handleSubmit(submitHander)}>
          <div>
            <input
              className='input'
              type='text'
              name='name'
              placeholder='名称'
              {...register("name")}
            />
            <DisplayError errors={formErrors.name} />
          </div>

          <div>
            <input
              className='input'
              type='text'
              placeholder="电子邮件地址"
              {...register("email")}
            />
            <DisplayError errors={formErrors.email} />
          </div>

          <div>
            <input
              className='input'
              type='password'
              placeholder='密码'
              {...register("password")}
            />
            <DisplayError errors={formErrors.password} />
          </div>

          <div>
            <input
              className='input'
              type='password'
              placeholder='重复密码'
              {...register("confirmPassword")}
            />
            <DisplayError errors={formErrors.confirmPassword} />
          </div>

          <button
            className='btn mx-auto w-60'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : '注册'}
          </button>
        </form>

        <div>
          <p className='inline ml-2'>已经拥有账户</p>
          <Link href='/login'>
            <span className='text-blue-400 text-lg '>登录</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
