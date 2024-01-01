'use client'
import { useChangeRoute } from 'hooks'

import {
  OrderCard,
  Pagination,
  ShowWrapper,
  EmptyOrdersList,
  PageContainer,
  OrderSkeleton,
} from 'components'

import { useGetOrdersQuery } from '@/store/services'

import { useTitle, useUrlQuery } from '@/hooks'

const Orders = () => {
  useTitle('订单管理')
  //? Assets
  const query = useUrlQuery()
  const changeRoute = useChangeRoute()

  //? Get Orders Data
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetOrdersQuery({
    pageSize: 5,
    page: query.page ? +query.page : 1,
  })

  //? Render
  return (
    <main id="profileOrders">
      <PageContainer title="订单历史">
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? data?.data?.ordersLength : 0}
          emptyComponent={<EmptyOrdersList />}
          loadingComponent={<OrderSkeleton />}
        >
          <div className="px-4 py-3 space-y-3">
            {data?.data?.orders.map(item => <OrderCard key={item._id} order={item} />)}
          </div>
        </ShowWrapper>

        {data && data?.data?.ordersLength > 5 && (
          <div className="py-4 mx-auto lg:max-w-5xl">
            <Pagination
              pagination={data?.data?.pagination}
              changeRoute={changeRoute}
              section="profileOrders"
              client
            />
          </div>
        )}
      </PageContainer>
    </main>
  )
}
export default Orders
