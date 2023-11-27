import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Cookies from "js-cookie";

import { userLogin, userLogout } from "store/slices/authSlice";
import { useGetDataQuery } from "store/slices/fetchApiSlice";
import { useDispatch } from "react-redux";

import { confirmAlert } from "utils/alert";

export default function RefreshTokenHandler() {
  const dispatch = useDispatch();
  const router = useRouter();

  const refreshToken = Cookies.get("refreshToken");

  if (refreshToken) {
    const { data, isSuccess, isError } = useGetDataQuery({
      url: "/api/auth/accessToken",
      token: "",
    });

    useEffect(() => {
      if (isSuccess) dispatch(userLogin(data));
      if (isError) {
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
    }, [isSuccess, isError]);
  }

  return 'null';
}
