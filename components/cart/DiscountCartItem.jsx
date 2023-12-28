import { formatNumber } from 'utils'

const DiscountCartItem = props => {
  //? Props
  const { discount, price } = props

  //? Assets
  const discountPercent = discount / 100
  console.log('discountPercent', discountPercent)

  //? Render(s)
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <span className="text-red-500 farsi-digits">
          {formatNumber(+(price * discountPercent).toFixed())}
        </span>

        <span className="text-red-500">¥</span>

        <span className="text-red-500">折扣</span>
      </div>
      <div className="flex items-center gap-x-2">
        <span className="text-sm text-gray-700 farsi-digits">
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <span className="">¥</span>
      </div>
    </div>
  )
}

export default DiscountCartItem
