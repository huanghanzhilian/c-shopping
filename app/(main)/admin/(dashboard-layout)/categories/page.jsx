'use client'

import { BigLoading, PageContainer } from '@/components'
import { useTitle, useUrlQuery } from '@/hooks'
import { useGetCategoriesQuery } from '@/store/services'
import Link from 'next/link'

export default function CategoriesPage() {
  useTitle('分类管理')
  const query = useUrlQuery()
  const parentId = query.parent_id
  const parentLvl = query.parent_lvl
  //? Get Categories Data
  const { childCategories, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => {
      return {
        childCategories: data?.data?.categories?.filter(category => category.parent === parentId),
        isLoading,
      }
    },
  })
  //? Render(s)
  if (isLoading)
    return (
      <div className="px-3 py-20">
        <BigLoading />
      </div>
    )

  return (
    <PageContainer title="分类管理">
      <section className="p-3">
        <div className="space-y-8 text-white">
          <div className="flex justify-between">
            {childCategories && childCategories[0]?.level !== 0 ? (
              <Link
                href={`categories/create${parentId ? `?parent_id=${parentId}` : ''}&${
                  parentLvl ? `parent_lvl=${parentLvl}` : ''
                }`}
                className="flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3"
              >
                添加新文件夹
              </Link>
            ) : (
              <div />
            )}
            <Link
              href="/admin/categories/tree"
              className="flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3"
            >
              图表展示
            </Link>
          </div>

          <div className=" overflow-x-auto mt-7 ">
            <table className="w-full whitespace-nowrap">
              <thead className="h-9 bg-emerald-50">
                <tr className="text-emerald-500">
                  <th className="px-2 border-gray-100 border-x-2">分类名称</th>
                  <th className="border-gray-100 border-x-2">操作</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {childCategories && childCategories.length > 0 ? (
                  childCategories?.map(category => (
                    <tr
                      className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50 "
                      key={category._id}
                    >
                      <td className="w-2/4 px-2 py-4">{category.name}</td>
                      <td className=" gap-3 px-2 py-4">
                        {category.level !== 3 && (
                          <Link
                            href={`/admin/categories?parent_id=${category._id}&parent_lvl=${category.level}`}
                            className="bg-green-50 text-green-500 rounded-sm py-1 px-1.5 max-w-min"
                          >
                            子类
                          </Link>
                        )}
                        <Link
                          href={`/admin/categories/edit/${category._id}?${
                            parentId ? `parent_id=${parentId}` : ''
                          }&${parentLvl ? `parent_lvl=${parentLvl}` : ''}`}
                          className="bg-amber-50 text-amber-500 rounded-sm py-1 px-1.5 max-w-min"
                        >
                          编辑
                        </Link>
                        {category.level === 2 && (
                          <Link
                            href={`/admin/details/${category._id}?category_name=${category.name}`}
                            className="bg-blue-50 text-blue-500 rounded-sm py-1 px-1.5 max-w-min"
                          >
                            规格和特点
                          </Link>
                        )}
                        {category.level < 2 && (
                          <>
                            <Link
                              href={`/admin/sliders?category_id=${category._id}&category_name=${category.name}`}
                              className="bg-fuchsia-50 text-fuchsia-500 rounded-sm py-1 px-1.5 max-w-min"
                            >
                              滑块
                            </Link>
                            <Link
                              href={`/admin/banners?category_id=${category._id}&category_name=${category.name}`}
                              className="bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 max-w-min"
                            >
                              横幅
                            </Link>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <p className="py-4 text-sm text-center text-red-700">还没有分类</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
