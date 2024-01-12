import { formatNumber } from 'utils'

import { Button } from 'components'

import { useAppSelector } from 'hooks'

const CartInfo = props => {
  //? Porps
  const { handleRoute, cart } = props

  //? Store
  const { totalItems, totalPrice, totalDiscount } = useAppSelector(state => state.cart)

  //? Render(s)
  return (
    <div className="px-4 py-2 mt-10 space-y-5 lg:mt-0 lg:h-fit lg:py-4">
      {/* total cart price */}
      <div className="pb-2 border-b border-gray-200 flex justify-between">
        <span className="text-sm">商品价格({formatNumber(totalItems)}件商品)</span>
        <div className="flex-center">
          <span className="">{formatNumber(totalPrice)}</span>
          <span className="ml-1">¥</span>
        </div>
      </div>

      {/* total cart items */}
      <div className="flex justify-between">
        <span>总计购物车</span>
        <div className="flex-center">
          <span className="text-sm">{formatNumber(totalPrice - totalDiscount)}</span>
          <span className="ml-1">¥</span>
        </div>
      </div>

      <span className="inline-block w-full pb-2 border-b border-gray-200 lg:max-w-xs">
        运费是根据您的货件的地址、交货时间、重量和体积计算的
      </span>

      {/* total cart profit */}
      <div className="flex justify-between">
        <span className="text-red-500">您从购买中省去的金额</span>
        <div className="flex-center gap-x-1">
          <span className="text-red-500 text-sm">
            ({((totalDiscount / totalPrice) * 100).toFixed(1)}%)
          </span>
          <span className="text-red-500">{formatNumber(totalDiscount)}</span>
          <span className="ml-1 text-red-500">¥</span>
        </div>
      </div>

      {cart && (
        <Button onClick={handleRoute} className="hidden w-full lg:block">
          继续
        </Button>
      )}
    </div>
  )
}

export default CartInfo
