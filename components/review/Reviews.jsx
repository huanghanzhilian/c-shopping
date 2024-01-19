import { useGetProductReviewsQuery } from '@/store/services'

import {
  Pagination,
  Icons,
  ShowWrapper,
  EmptyComment,
  ReviewModal,
  ReveiwSkeleton,
  ReviewProductCard,
  RedirectToLogin,
} from 'components'

import { useUrlQuery, useUserInfo, useDisclosure, useChangeRoute } from '@/hooks'

const Reviews = props => {
  //? Props
  const { numReviews, prdouctID, productTitle } = props

  //? Assets
  const query = useUrlQuery()
  const changeRoute = useChangeRoute()
  const page = query.page ? +query.page : 1

  const { isVerify } = useUserInfo()
  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()

  //? Modals
  const [isShowReviewModal, reviewModalHandlers] = useDisclosure()

  //? Get Product-Reviews Query
  const { data, isSuccess, isFetching, error, isError, refetch } = useGetProductReviewsQuery(
    {
      id: prdouctID,
      page,
    },
    { skip: numReviews > 0 ? false : true }
  )

  //? Handlers
  const handleOpenCommentModal = () => {
    if (!isVerify) return redirectModalHandlers.open()
    reviewModalHandlers.open()
  }

  //? Render(s)
  return (
    <>
      <RedirectToLogin
        title="您尚未登录"
        text=""
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
      <ReviewModal
        isShow={isShowReviewModal}
        onClose={reviewModalHandlers.close}
        productTitle={productTitle}
        prdouctID={prdouctID}
      />
      <section className="px-3 py-3 space-y-4 lg:max-w-3xl xl:max-w-5xl" id="_productReviews">
        <div className="flex items-center justify-between">
          <h4 className="mb-3 lg:border-b-2 lg:border-red-500">商品评价</h4>
          <span className="text-xs text-sky-500">{numReviews} 条评价</span>
        </div>
        <div className="lg:ml-10">
          <div className="mb-8">
            <button
              type="button"
              onClick={handleOpenCommentModal}
              className="flex items-center w-full gap-x-5"
            >
              <Icons.Comment className="icon" />
              <span className="text-sm text-black ">写下您对该商品的评价</span>
              <Icons.ArrowRight2 className="ml-auto icon" />
            </button>
            <p className="mt-6 text-xs text-gray-500">提交确认后，通过将赠送积分。</p>
          </div>

          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data?.data?.reviewsLength : 0}
            emptyComponent={<EmptyComment />}
            loadingComponent={<ReveiwSkeleton />}
          >
            <div className="py-3 space-y-4 divide-y-2 lg:px-6 sm:px-2">
              {data?.data?.reviews?.map(item => <ReviewProductCard item={item} key={item._id} />)}
            </div>
          </ShowWrapper>

          {data && data?.data?.reviewsLength > 5 && (
            <div className="py-4 mx-auto lg:max-w-5xl">
              <Pagination
                pagination={data?.data?.pagination}
                changeRoute={changeRoute}
                section="_productReviews"
                client
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Reviews
