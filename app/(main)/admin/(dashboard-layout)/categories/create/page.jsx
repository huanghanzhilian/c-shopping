'use client'

import { BigLoading, CategoryForm, HandleResponse, PageContainer } from '@/components'
import { useTitle, useUrlQuery } from '@/hooks'
import { useCreateCategoryMutation, useGetCategoriesQuery } from '@/store/services'
import { useRouter } from 'next/navigation'

export default function CategoriesCreatePage() {
  useTitle('创建分类')
  //? Assets
  const { push } = useRouter()
  const query = useUrlQuery()
  const parentId = query.parent_id
  const parentLvl = query.parent_lvl ? +query.parent_lvl : 0

  //? Queries
  //*   Get Categories
  const { isLoading: isLoading_get, parentCategory } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      parentCategory: data?.data?.categories.find(category => category._id === parentId),
      isLoading,
    }),
  })
  //*   Create Category
  const [createCtegory, { data, isSuccess, isLoading, error, isError }] =
    useCreateCategoryMutation()

  //? Handlers
  const createHandler = data => {
    const { name, slug, image, colors } = data
    createCtegory({
      body: {
        name,
        parent: parentId || '',
        slug: slug.trim().split(' ').join('-'),
        image,
        colors,
        level: parentCategory ? parentCategory?.level + 1 : 0,
      },
    })
  }

  const onSuccess = () => {
    push(`/admin/categories${parentId ? `?parent_id=${parentId}` : ''}`)
  }

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.data?.message}
          onSuccess={onSuccess}
        />
      )}

      {isLoading_get ? (
        <div className="px-3 py-20">
          <BigLoading />
        </div>
      ) : (
        <main>
          <PageContainer title="创建分类">
            <CategoryForm
              mode="create"
              isLoading={isLoading}
              parentLvl={parentLvl}
              createHandler={createHandler}
            />
          </PageContainer>
        </main>
      )}
    </>
  )
}
