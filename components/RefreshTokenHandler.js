"use client"

import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "store/slices/authSlice";

import verifyToken from "utils/verifyToken";
import { confirmAlert } from "utils/alert";

export default function RefreshTokenHandler() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { token } = useSelector((state) => state.auth);

  //? handle exp token
  const isverify = verifyToken(token);

  if (!isverify && token) {
    dispatch(userLogout());
    confirmAlert({
      text: "刷新登录出现异常",
      title: "",
      icon: "warning",
      confirmButtonText: "去登录",
    }).then((result) => {
      if (result.isConfirmed) router.push("/login");
    });
  }

  return null;
}
