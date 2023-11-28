"use client"

import { updateUser } from "store/slices/authSlice";
import { usePatchDataMutation } from "store/slices/fetchApiSlice";
import { BackButton, Icons } from "components";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInfo } from "utils/alert";

export default function Addresses() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const [
    patchData,
    { data, isSuccess, isError, error },
  ] = usePatchDataMutation();

  useEffect(() => {
    if (isSuccess) dispatch(updateUser(data.user));
  }, [isSuccess]);

  const edditAddressHandler = () => {
    editInfo(
      "address",
      "请完整输入您的地址",
      patchData,
      token,
      isError,
      error
    );
  };

  return (
    <div>
      <BackButton>地址</BackButton>
      <div className='section-divide-y' />
      {user.address ? (
        <div className='px-5 flex-1'>
          <div className='flex justify-between py-4 border-b border-gray-200'>
            <p>{user.address}</p>
            {user.address ? (
              <Icons.Edit
                className='icon cursor-pointer'
                onClick={edditAddressHandler}
              />
            ) : (
              <Icons.Plus
                className='icon cursor-pointer'
                onClick={edditAddressHandler}
              />
            )}
          </div>
        </div>
      ) : (
        <div className='py-20 flex flex-col items-center gap-y-4'>
          <div className='relative h-52 w-52'>
            <Image src='/images/address.svg' layout='fill' />
          </div>
          <p>暂无地址</p>

          <button
            className='border-2 border-red-600 text-red-600 flex items-center gap-x-3 px-3 py-2 rounded-lg'
            onClick={edditAddressHandler}
          >
            <Icons.Location className='icon text-red-600' />
            <span>地址输入</span>
          </button>
        </div>
      )}
    </div>
  );
}
