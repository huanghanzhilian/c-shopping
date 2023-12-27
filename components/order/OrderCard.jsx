import Link from 'next/link'

import moment from 'moment-jalaali'

import { HandleResponse, Icons, ResponsiveImage } from 'components'

import { formatNumber } from 'utils'

import { useUpdateOrderMutation } from '@/store/services'

const OrderCard = props => {
  //? Props
  const { order, singleOrder } = props

  //? Edit Order Query
  const [editOrder, { data, isSuccess, isError, error }] = useUpdateOrderMutation()

  //? Handlers
  const handleChangeToDelivered = () => {
    editOrder({
      id: order._id,
      body: { paid: true, delivered: true },
    })
  }
  const handleChangeToInProccess = () => {
    editOrder({
      id: order._id,
      body: { paid: false, delivered: false },
    })
  }

  //? Render(s)
  return (
    <>
      {/* Handle Edit Order Response */}
      {(isSuccess || isError) && (
        <HandleResponse isError={isError} isSuccess={isSuccess} error={error} message={data?.msg} />
      )}
      <div className="py-4 space-y-3 border-b border-gray-200 lg:border lg:rounded-lg ">
        <div className="flex items-center justify-between lg:px-3">
          <div className="flex items-center gap-x-2 ">
            {order.delivered ? (
              <Icons.Check className="p-0.5 w-6 h-6 bg-lime-500 text-white rounded-full" />
            ) : (
              <Icons.Clock2 className="p-0.5 w-6 h-6 bg-amber-500 text-white rounded-full" />
            )}
            <span className="text-sm text-black">{order.delivered ? '发表' : '加工'}</span>
          </div>
          {/* <Icons.ArrowLeft className='icon w-7 h-7' /> */}
          {order.delivered && (
            <span className="farsi-digits">{moment(order.updatedAt).format('jYYYY/jM/jD')}</span>
          )}
          {singleOrder && (
            <div className="relative h-fit px-1.5 group self-end">
              <Icons.More className="cursor-pointer icon" />
              <div className="absolute left-0 z-10 hidden px-4 py-3 bg-white rounded shadow-3xl top-5 group-hover:flex">
                <div className="space-y-4">
                  <button
                    type="button"
                    className="flex items-center w-48 gap-x-3 lg:w-56"
                    onClick={handleChangeToDelivered}
                    disabled={order.delivered}
                  >
                    <Icons.Check className="text-white rounded-full p-0.5 icon bg-green-500 " />
                    <span className="block">将状态更改为已交付</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center w-48 gap-x-3 lg:w-56"
                    onClick={handleChangeToInProccess}
                    disabled={!order.delivered}
                  >
                    <Icons.Clock2 className="text-white rounded-full p-0.5 icon bg-amber-500 " />
                    <span className="block">将状态更改为处理中</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-between lg:px-3">
          <div>
            <span>订单号：</span>
            <span className="mr-2 text-sm text-black">{order._id}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-black farsi-digits">
              {formatNumber(order.totalPrice - order.totalDiscount)}
            </span>
            <span className="w-6 h-6">¥</span>
          </div>
        </div>
        <div className="flex flex-wrap py-5 gap-x-5 gap-y-3 lg:border-t lg:border-gray-200 lg:px-3">
          {order.cart.map((cartItem, index) => (
            <Link href={`/products/${cartItem.productID}`} key={index}>
              <ResponsiveImage dimensions="w-16 h-16" src={cartItem.img.url} alt={cartItem.name} />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderCard
