'use client'

import {
  ProductCard,
  Pagination,
  Sort,
  ProductsAside,
  SubCategories,
  Filter,
  ProductSkeleton,
} from 'components'

import { useChangeRoute, useMediaQuery } from 'hooks'

import { useUrlQuery } from '@/hooks'
import { useGetCategoriesQuery, useGetProductsQuery } from '@/store/services'

const ProductsHome = () => {
  //? Assets
  const query = useUrlQuery()

  const category = query?.category?.toString() ?? ''
  const page_size = query?.page_size?.toString() ?? ''
  const page = query?.page?.toString() ?? ''
  const sort = query?.sort?.toString() ?? ''
  const search = query?.search?.toString() ?? ''
  const inStock = query?.inStock?.toString() ?? ''
  const discount = query?.discount?.toString() ?? ''
  const price = query?.price?.toString() ?? ''

  const isDesktop = useMediaQuery('(min-width:1280px)')

  //? Handlers
  const changeRoute = useChangeRoute()

  const handleChangeRoute = newQueries => {
    changeRoute({
      ...query,
      page: 1,
      ...newQueries,
    })
  }

  //? Querirs
  //*    Get Products Data
  const { data, isFetching: isFetchingProduct } = useGetProductsQuery({
    category,
    page_size,
    page,
    sort,
    search,
    inStock,
    discount,
    price,
  })

  //*    Get childCategories Data
  const { isLoading: isLoadingCategories, childCategories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ isLoading, data }) => {
      const currentCategory = data?.data?.categories.find(cat => cat.slug === query?.category)
      const childCategories = data?.data?.categories.filter(
        cat => cat.parent === currentCategory?._id
      )
      return { childCategories, isLoading }
    },
  })

  //? Render(s)
  return (
    <>
      <main className="lg:px-3 container xl:mt-32">
        <SubCategories childCategories={childCategories} isLoading={isLoadingCategories} />

        <div className="px-1 lg:flex lg:gap-x-0 xl:gap-x-3">
          <ProductsAside
            mainMaxPrice={data?.data?.mainMaxPrice}
            mainMinPrice={data?.data?.mainMinPrice}
            handleChangeRoute={handleChangeRoute}
          />
          <div id="_products" className="w-full p-4 mt-3 ">
            {/* Filters & Sort */}
            <div className="divide-y-2 ">
              <div className="flex py-2 gap-x-3">
                {!isDesktop && (
                  <Filter
                    mainMaxPrice={data?.mainMaxPrice}
                    mainMinPrice={data?.mainMinPrice}
                    handleChangeRoute={handleChangeRoute}
                  />
                )}

                <Sort handleChangeRoute={handleChangeRoute} />
              </div>

              <div className="flex justify-between py-2">
                <span>所有商品</span>
                <span className="farsi-digits">{data?.data?.productsLength} 件商品</span>
              </div>
            </div>

            {/* Products */}
            {isFetchingProduct ? (
              <ProductSkeleton />
            ) : data && data?.data?.products.length > 0 ? (
              <section className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {data?.data?.products.map(item => <ProductCard product={item} key={item._id} />)}
              </section>
            ) : (
              <section className="text-center text-red-500 xl:border xl:border-gray-200 xl:rounded-md xl:py-4">
                没有找到产品
              </section>
            )}
          </div>
        </div>

        {data && data.productsLength > 10 && (
          <div className="py-4 mx-auto lg:max-w-5xl">
            <Pagination
              pagination={data?.pagination}
              changeRoute={handleChangeRoute}
              section="_products"
              client
            />
          </div>
        )}
      </main>
    </>
  )
}

export default ProductsHome
