import { useGetUserInfoQuery } from '@/store/services'
import useVerify from './useVerify'

export default function useUserInfo() {
  const isVerify = useVerify()

  const { data, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !isVerify,
  })

  return { userInfo: data?.data, isVerify, isLoading }
}
