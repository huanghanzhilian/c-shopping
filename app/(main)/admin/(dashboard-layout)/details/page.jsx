'use client'
import Link from 'next/link'

import { BigLoading, PageContainer } from 'components'

import { useGetCategoriesQuery } from '@/store/services'
import { useTitle } from '@/hooks'
import moment from 'moment-jalaali'

const DetailsPage = () => {
  useTitle('分类规格')
  //? Get Categories
  const { categories, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.data?.categories.filter(category => category.level === 2),
      isLoading,
    }),
  })

  //? Render(s)
  if (isLoading)
    return (
      <div className="px-3 py-20">
        <BigLoading />
      </div>
    )

  return (
    <main>
      <PageContainer title="分类规格">
        <section className="p-3 mx-auto mb-10 space-y-8">
          <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
            <table className="w-full whitespace-nowrap">
              <thead className="h-9 bg-emerald-50">
                <tr className="text-emerald-500">
                  <th className="px-2 border-gray-100 border-x-2">名称</th>
                  <th className="px-2 border-gray-100 border-x-2">创建时间</th>
                  <th className="px-2 border-gray-100 border-x-2">更新时间</th>
                  <th className="border-gray-100 border-x-2">操作</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {categories &&
                  categories.map(category => (
                    <tr
                      className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50"
                      key={category._id}
                    >
                      <td className="w-1/4 px-2 py-4">{category.name}</td>
                      <td className="w-1/4 px-2 py-4">
                        {moment(category.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      </td>
                      <td className="w-1/4 px-2 py-4">
                        {moment(category.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                      </td>
                      <td className="px-2 py-4">
                        <Link
                          href={`/admin/details/${category._id}?category_name=${category.name}`}
                          className="bg-blue-50 text-blue-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block"
                        >
                          编辑规格
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </PageContainer>
    </main>
  )
}

export default DetailsPage
