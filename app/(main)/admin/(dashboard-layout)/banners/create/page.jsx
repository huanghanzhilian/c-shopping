'use client'

import { useRouter } from 'next/navigation'

import { BannerForm, HandleResponse, PageContainer } from 'components'

import { SubmitHandler } from 'react-hook-form'

import { useCreateBannerMutation } from '@/store/services'
import { useTitle, useUrlQuery } from '@/hooks'

const CreateBannerPage = () => {
  useTitle('新增banner')
  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const categoryId = query?.category_id

  //? Queries
  //*     Create Banner
  const [createBanner, { data, isSuccess, isLoading, error, isError }] = useCreateBannerMutation()

  //? Handlers
  const createHandler = data => {
    const { image, isPublic, title, type, uri } = data
    createBanner({
      body: { category_id: categoryId, image, isPublic, title, type, uri },
    })
  }

  const onSuccess = () => back()

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}

      <main>
        <PageContainer title="新增banner">
          <BannerForm mode="create" isLoadingCreate={isLoading} createHandler={createHandler} />
        </PageContainer>
      </main>
    </>
  )
}

export default CreateBannerPage
