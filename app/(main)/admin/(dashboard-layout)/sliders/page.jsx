'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { EmptyCustomList, PageContainer, TableSkeleton } from 'components'

import { useGetCategoriesQuery, useGetSlidersQuery } from '@/store/services'
import { useTitle, useUrlQuery } from '@/hooks'

const SlidersPage = () => {
  const query = useUrlQuery()
  const category_id = query?.category_id
  const category_name = query?.category_name

  //? Queries
  //*     Get Categories
  const { categories, isLoading: isLoading_get_categories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.data?.categories
        .filter(category => category.level < 2)
        .sort((a, b) => a.level - b.level),
      isLoading,
      skip: !!category_id,
    }),
  })

  //*     Get Sliders
  const { data: sliders, isLoading: isLoadingGetSliders } = useGetSlidersQuery(
    { category: category_id },
    { skip: !!!category_id }
  )

  //? Render(s)
  const title = category_name ? `分类滑块管理 - ${category_name}` : '滑块管理'

  useTitle(title)

  const renderContent = () => {
    if (isLoading_get_categories || isLoadingGetSliders) {
      return (
        <tr>
          <td colSpan="4">
            <TableSkeleton />
          </td>
        </tr>
      )
    }

    if (categories && !category_id) {
      return categories.map(category => (
        <tr
          className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50"
          key={category._id}
        >
          <td className="w-3/4 px-2 py-4">{category.name}</td>
          <td className="px-2 py-4">
            <Link
              href={`/admin/sliders?category_id=${category._id}&category_name=${category.name}`}
              className="bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block"
            >
              子集
            </Link>
          </td>
        </tr>
      ))
    }

    if (sliders && sliders.data && sliders.data.length > 0) {
      return sliders.data.map(slider => (
        <tr
          className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50"
          key={slider._id}
        >
          <td className="w-3/4 px-2 py-4">{slider.title}</td>
          <td className="px-2 py-4">
            <Link
              href={`/admin/sliders/edit/${slider._id}?slider_name=${slider.title}`}
              className="bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block"
            >
              编辑
            </Link>
          </td>
        </tr>
      ))
    } else
      return (
        <tr>
          <td colSpan="4">
            <EmptyCustomList />
          </td>
        </tr>
      )
  }

  return (
    <main>
      <PageContainer title={title}>
        <section className="p-3 mx-auto mb-10 space-y-8">
          {category_id && (
            <Link
              href={`sliders/create?category_id=${category_id}&category_name=${category_name}`}
              className="flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3"
            >
              添加新滑块
            </Link>
          )}
          <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
            <table className="w-full whitespace-nowrap">
              <thead className="h-9 bg-emerald-50">
                <tr className="text-emerald-500">
                  <th className="px-2 border-gray-100 border-x-2">
                    {category_name ? '标题' : '分类名称'}
                  </th>
                  <th className="border-gray-100 border-x-2">操作</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">{renderContent()}</tbody>
            </table>
          </div>
        </section>
      </PageContainer>
    </main>
  )
}

export default SlidersPage
