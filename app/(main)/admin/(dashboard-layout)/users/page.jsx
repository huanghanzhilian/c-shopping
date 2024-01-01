'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import {
  PageContainer,
  ShowWrapper,
  EmptyUsersList,
  TableSkeleton,
  UsersTable,
  ConfirmDeleteModal,
  HandleResponse,
  Pagination,
} from '@/components'
import { useGetUsersQuery, useDeleteUserMutation } from '@/store/services'
import { useDisclosure, useChangeRoute, useTitle } from '@/hooks'

export default function UsersPage() {
  useTitle('用户管理')
  //? Assets
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const changeRoute = useChangeRoute()

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  //? State
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })

  //? Get User Data
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetUsersQuery({
    page: page || 1,
  })

  //? Delete User Query
  const [
    deleteUser,
    {
      isSuccess: isSuccess_delete,
      isLoading: isLoading_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
    },
  ] = useDeleteUserMutation()

  //? Handlers
  const deleteUserHandler = id => {
    setDeleteInfo({ id })
    confirmDeleteModalHandlers.open()
  }
  const onConfirmUserDelete = () => deleteUser({ id: deleteInfo.id })

  const onCancelUserDelete = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }

  return (
    <>
      <ConfirmDeleteModal
        title="用户"
        isLoading={isLoading_delete}
        isShow={isShowConfirmDeleteModal}
        onClose={onCancelUserDelete}
        onCancel={onCancelUserDelete}
        onConfirm={onConfirmUserDelete}
      />
      {/* Handle Delete Response */}
      {(isSuccess_delete || isError_delete) && (
        <HandleResponse
          isError={isError_delete}
          isSuccess={isSuccess_delete}
          error={error_delete?.data?.message}
          message={data_delete?.message}
          onSuccess={() => {
            onCancelUserDelete()
          }}
          onError={() => {
            onCancelUserDelete()
          }}
        />
      )}
      <main id="_adminUsers">
        <PageContainer title="用户管理">
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data && data.data ? data.data.usersLength : 0}
            emptyComponent={<EmptyUsersList />}
            loadingComponent={<TableSkeleton />}
          >
            <UsersTable deleteUserHandler={deleteUserHandler} users={data?.data?.users} />
          </ShowWrapper>
          {data?.data?.usersLength > 5 && (
            <div className="py-4 mx-auto lg:max-w-5xl">
              <Pagination
                pagination={data?.data?.pagination}
                changeRoute={changeRoute}
                section="_adminUsers"
              />
            </div>
          )}
        </PageContainer>
      </main>
    </>
  )
}
