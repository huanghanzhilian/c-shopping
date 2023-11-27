"use client"

import { updateUser } from "store/slices/authSlice";
import { usePatchDataMutation } from "store/slices/fetchApiSlice";
import { BackButton, Icons } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInfo } from "utils/alert";

export default function PersonalInfo() {
  const { user, token } = useSelector((state) => state.auth);
  const dispach = useDispatch();
  const [
    patchData,
    { data, isSuccess, isError, error },
  ] = usePatchDataMutation();

  console.log({ data, isSuccess, isError, error });

  useEffect(() => {
    if (isSuccess) dispach(updateUser(data.user));
  }, [isSuccess]);

  const mobilEditHandler = () => {
    editInfo(
      "mobile",
      "输入您的电话号码",
      patchData,
      token,
      isError,
      error
    );
  };
  const nameEditHandler = () => {
    editInfo(
      "name",
      "输入名称",
      patchData,
      token,
      isError,
      error
    );
  };

  return (
    <div>
      <BackButton>用户帐户信息</BackButton>
      <div className='section-divide-y' />
      <div className='lg:flex'>
        <div className='px-5 flex-1'>
          <div className='flex justify-between py-4 border-b border-gray-200'>
            <p>{user.name}</p>
            {user.name ? (
              <Icons.Edit
                className='icon cursor-pointer'
                onClick={nameEditHandler}
              />
            ) : (
              <Icons.Plus
                className='icon cursor-pointer'
                onClick={nameEditHandler}
              />
            )}
          </div>
        </div>

        <div className='px-5 flex-1'>
          <div className='flex justify-between py-4 border-b border-gray-200'>
            <p>{user.mobile ? user.mobile : "电话号码"}</p>
            {user.mobile ? (
              <Icons.Edit
                className='icon cursor-pointer'
                onClick={mobilEditHandler}
              />
            ) : (
              <Icons.Plus
                className='icon cursor-pointer'
                onClick={mobilEditHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

