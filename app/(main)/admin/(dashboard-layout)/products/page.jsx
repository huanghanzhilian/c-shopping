'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '@/store/services'

import {
  ConfirmDeleteModal,
  DeleteIconBtn,
  EditIconBtn,
  HandleResponse,
  Icons,
  PageContainer,
  Pagination,
  SelectCategories,
  ShowWrapper,
  TableSkeleton,
} from 'components'

import { useDisclosure, useChangeRoute } from 'hooks'
import { useTitle, useUrlQuery } from '@/hooks'

const Products = () => {
  useTitle('商品管理')
  //? Assets
  const { push } = useRouter()
  const query = useUrlQuery()
  const page = query.page ? +query.page : 1
  const category = query.category ?? ''

  const changeRoute = useChangeRoute()

  const initialSelectedCategories = {
    levelOne: {},
    levelTwo: {},
    levelThree: {},
  }

  //? Get Categories Query
  const { categories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      categories: data?.data?.categories,
    }),
  })

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  //?  State
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories)

  //? Querirs
  //*    Get Products Data
  const { data, isFetching, error, isError, refetch, isSuccess } = useGetProductsQuery({
    page,
    category,
    search: query?.search,
  })

  //*    Delete Product
  const [
    deleteProduct,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteProductMutation()

  //? Handlers
  const handleSearchChange = e => setSearch(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()

    const queryParams = {
      page: 1,
    }

    if (selectedCategories?.levelThree?._id) {
      queryParams.category = selectedCategories.levelThree.slug
      queryParams.levelOne = selectedCategories?.levelOne?._id
      queryParams.levelTwo = selectedCategories?.levelTwo?._id
      queryParams.levelThree = selectedCategories.levelThree._id
    } else if (selectedCategories?.levelTwo?._id) {
      queryParams.category = selectedCategories?.levelTwo.slug
      queryParams.levelOne = selectedCategories?.levelOne?._id
      queryParams.levelTwo = selectedCategories?.levelTwo._id
    } else if (selectedCategories?.levelOne?._id) {
      queryParams.category = selectedCategories?.levelOne.slug
      queryParams.levelOne = selectedCategories?.levelOne._id
    }

    if (search.trim()) {
      queryParams.search = search
    }

    changeRoute(queryParams)
  }

  const handleRemoveSearch = () => {
    setSearch('')
    setSelectedCategories(initialSelectedCategories)
    refetch()
    push('/admin/products')
  }

  const findCategory = id => categories?.find(cat => cat._id === id)

  //*   Delete Handlers
  const handleDelete = id => {
    setDeleteInfo({ id })
    confirmDeleteModalHandlers.open()
  }

  const onCancel = () => {
    setDeleteInfo({ id: '' })
    confirmDeleteModalHandlers.close()
  }

  const onConfirm = () => {
    deleteProduct({ id: deleteInfo.id })
  }

  const onSuccess = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }
  const onError = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }

  //? Re-Render
  useEffect(() => {
    if (categories) {
      if (query?.levelThree)
        setSelectedCategories({
          levelOne: findCategory(query.levelOne),
          levelThree: findCategory(query.levelThree),
          levelTwo: findCategory(query.levelTwo),
        })
      else if (query?.levelTwo)
        setSelectedCategories({
          ...selectedCategories,
          levelOne: findCategory(query.levelOne),
          levelTwo: findCategory(query.levelTwo),
        })
      else if (query?.levelOne)
        setSelectedCategories({
          ...selectedCategories,
          levelOne: findCategory(query.levelOne),
        })
    }
  }, [categories])

  useEffect(() => {
    if (query?.search) setSearch(query.search)
  }, [query?.search])

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title="该商品"
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />

      {/* Handle Delete Response */}
      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete?.data?.message}
          message={dataDelete?.message}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}

      <main>
        <PageContainer title="商品管理">
          <section className="p-3 space-y-7" id="_adminProducts">
            <form className="max-w-4xl mx-auto space-y-5" onSubmit={handleSubmit}>
              <SelectCategories
                setSelectedCategories={setSelectedCategories}
                selectedCategories={selectedCategories}
              />

              <div className="flex flex-row-reverse rounded-md gap-x-2 ">
                <button
                  type="button"
                  className="p-2 text-white border flex-center gap-x-2 min-w-max"
                  onClick={handleRemoveSearch}
                >
                  <span>重制筛选</span>
                  <Icons.Close className="icon" />
                </button>
                <input
                  type="text"
                  placeholder="商品名称..."
                  className="flex-grow p-2 text-left input"
                  value={search}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="p-2 border flex-center gap-x-2 min-w-max">
                  <span>过滤筛选</span>
                  <Icons.Search className="icon" />
                </button>
              </div>
            </form>

            <ShowWrapper
              error={error}
              isError={isError}
              refetch={refetch}
              isFetching={isFetching}
              isSuccess={isSuccess}
              dataLength={data?.data ? data?.data?.productsLength : 0}
              loadingComponent={<TableSkeleton count={10} />}
            >
              <div className="overflow-x mt-7">
                <table className="w-full overflow-scroll table-auto">
                  <thead className="h-9 bg-emerald-50">
                    <tr className="text-emerald-500">
                      <th className="border-gray-50 border-x-2">ID</th>
                      <th className="border-gray-100 border-x-2">名称</th>
                      <th className="border-gray-100 border-x-2">价格</th>
                      <th className="border-gray-100 border-x-2">销量</th>
                      <th className="border-gray-100 border-x-2">库存</th>
                      <th className="border-r-2 border-gray-100">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {data?.data?.products.length > 0 &&
                      data?.data?.products.map(item => (
                        <tr
                          className="text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50"
                          key={item._id}
                        >
                          <td className="px-2 py-4">{item._id}</td>
                          <td className="px-2 py-4">{item.title}</td>
                          <td className="px-2 py-4">{item.price}</td>
                          <td className="px-2 py-4">{item.sold}</td>
                          <td className="px-2 py-4">{item.inStock}</td>
                          <td className="px-2 py-4">
                            <DeleteIconBtn onClick={() => handleDelete(item._id)} />
                            <Link href={`/admin/products/edit/${item._id}`}>
                              <EditIconBtn />
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </ShowWrapper>

            {data && data?.data?.productsLength > 10 && (
              <Pagination
                pagination={data?.data?.pagination}
                changeRoute={changeRoute}
                section="_adminProducts"
              />
            )}
          </section>
        </PageContainer>
      </main>
    </>
  )
}

export default Products
