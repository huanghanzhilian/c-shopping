'use client'

import {
  CategoryForm,
  HandleResponse,
  PageContainer,
  ConfirmUpdateModal,
  BigLoading,
} from '@/components'
import { useDisclosure, useUrlQuery } from '@/hooks'
import { useGetCategoriesQuery, useUpdateCategoryMutation } from '@/store/services'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CategoriesEditPage({ params: { id } }) {
  //? Assets
  const { push } = useRouter()
  const query = useUrlQuery()
  const parentId = query.parent_id
  const parentLvl = query.parent_lvl ? +query.parent_lvl : 0

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState({})

  //? Queries
  //*   Get Categories
  const { isLoading: isLoading_get, selectedCategory } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      selectedCategory: data?.data?.categories.find(category => category._id === id),
      isLoading,
    }),
  })

  //*   Update Category
  const [
    updateCategory,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateCategoryMutation()

  //? Handlers
  const updateHandler = data => {
    setUpdateInfo(prev => ({ ...prev, ...selectedCategory, ...data }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirm = () => {
    updateCategory({
      id,
      body: updateInfo,
    })
  }

  const onCancel = () => {
    setUpdateInfo({})
    confirmUpdateModalHandlers.close()
  }

  const onSuccess = () => {
    setUpdateInfo({})
    confirmUpdateModalHandlers.close()
    push(`/admin/categories${parentId ? `?parent_id=${parentId}` : ''}`)
  }

  const onError = () => {
    setUpdateInfo({})
    confirmUpdateModalHandlers.close()
  }

  return (
    <>
      {/* Handle Update Category Response */}
      {(isSuccess_update || isError_update) && (
        <HandleResponse
          isError={isError_update}
          isSuccess={isSuccess_update}
          error={error_update?.data?.message}
          message={data_update?.message}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
      <ConfirmUpdateModal
        title="分类"
        isLoading={isLoading_update}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <main>
        <PageContainer title="编辑分类">
          {isLoading_get ? (
            <div className="px-3 py-20">
              <BigLoading />
            </div>
          ) : selectedCategory ? (
            <CategoryForm
              mode="edit"
              isLoading={isLoading_update}
              selectedCategory={selectedCategory}
              updateHandler={updateHandler}
            />
          ) : null}
        </PageContainer>
      </main>
    </>
  )
}
