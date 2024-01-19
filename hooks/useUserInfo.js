import { useGetUserInfoQuery } from '@/store/services'
import useVerify from './useVerify'
import { useAppDispatch } from './useRedux'
import { userLogin } from '@/store'

export default function useUserInfo() {
  const dispatch = useAppDispatch()
  const isVerify = useVerify()

  const { data, isLoading, error, isError } = useGetUserInfoQuery(undefined, {
    skip: !isVerify,
  })

  if (isError) dispatch(userLogin(''))

  return { userInfo: data?.data, isVerify, isLoading, error, isError }
}
