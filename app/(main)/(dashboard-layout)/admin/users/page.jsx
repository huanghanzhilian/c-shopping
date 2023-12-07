'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { PageContainer } from '@/components'
import { useGetUsersQuery } from '@/store/services'

export default function UsersPage() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  //? Get User Data
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetUsersQuery({
    page: page || 1,
  })
  return (
    <PageContainer title="用户管理">
      <div className="p-3">
        <div>UsersPage</div>
        {data?.data?.length &&
          data?.data.map(user => (
            <div key={user._id}>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
            </div>
          ))}
      </div>
    </PageContainer>
  )
}
