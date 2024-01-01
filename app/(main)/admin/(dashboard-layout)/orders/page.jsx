'use client'

import { useGetOrdersQuery } from '@/store/services'

import {
  Pagination,
  ShowWrapper,
  EmptyOrdersList,
  PageContainer,
  OrdersTable,
  TableSkeleton,
} from 'components'

import { useChangeRoute } from 'hooks'

import { useTitle, useUrlQuery } from '@/hooks'

const OrdersHome = () => {
  useTitle('订单管理')
  //? Assets
  const query = useUrlQuery()
  const page = query.page ? +query.page : 1

  const changeRoute = useChangeRoute()

  //? Get Orders Query
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetOrdersQuery({
    page,
    pageSize: 5,
  })

  //? Render(s)
  return (
    <main id="_adminOrders">
      <PageContainer title="订单管理">
        <section className="p-3 md:px-3 xl:px-8 2xl:px-10" id="orders">
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data?.data?.ordersLength ?? 0}
            emptyComponent={<EmptyOrdersList />}
            loadingComponent={<TableSkeleton />}
          >
            {data && <OrdersTable orders={data?.data?.orders} />}
          </ShowWrapper>

          {data && data?.data?.ordersLength > 10 && (
            <div className="py-4 mx-auto lg:max-w-5xl">
              <Pagination
                pagination={data?.data?.pagination}
                changeRoute={changeRoute}
                section="_adminOrders"
              />
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  )
}

export default OrdersHome
