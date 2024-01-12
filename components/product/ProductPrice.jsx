import { formatNumber } from 'utils'

import { DiscountProduct } from 'components'

const ProductPrice = props => {
  //? Props
  const { singleProduct, inStock, discount, price } = props

  //? Render(s)
  return (
    <div className={`${(singleProduct && 'flex flex-col-reverse') || ''}`}>
      <div className={`flex items-center ${(singleProduct && 'self-end') || ''}`}>
        <span className="text-sm text-gray-700">
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <span className="ml-1">¥</span>
      </div>

      {discount > 0 && (
        <div>
          {singleProduct && discount > 0 && inStock !== 0 && (
            <DiscountProduct discount={discount} />
          )}
          <span className="ml-2 text-sm text-gray-500 line-through">
            {formatNumber(price)}
            <span className="ml-1">¥</span>
          </span>
        </div>
      )}
    </div>
  )
}

export default ProductPrice
