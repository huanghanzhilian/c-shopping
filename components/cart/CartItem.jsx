import Link from 'next/link'

import { formatNumber } from 'utils'

import { SpecialSell, CartButtons, Icons, DiscountCartItem, ResponsiveImage } from 'components'

const CartItem = props => {
  //? Props
  const { item } = props

  //? Render(s)
  return (
    <article className="flex px-4 py-5 space-x-4 ">
      {/* image & cartButtons */}
      <div className="space-y-4">
        <ResponsiveImage dimensions="w-28 h-28" src={item.img.url} alt={item.name} />

        <div className="mx-auto w-fit ">
          <SpecialSell discount={item.discount} inStock={item.inStock} />
        </div>

        <CartButtons item={item} />
      </div>

      {/* name */}
      <div>
        <h5 className="mb-3 text-sm">
          <Link href={`/products/${item.productID}`}>{item.name}</Link>
        </h5>

        {/* info */}
        <div className="space-y-3">
          {item.color && (
            <div className="flex items-center gap-x-2">
              <span
                className="inline-block w-5 h-5 shadow rounded-xl"
                style={{ background: item.color.hashCode }}
              />
              <span>{item.color.name}</span>
            </div>
          )}
          {item.size && (
            <div className="flex items-center gap-x-2">
              <Icons.Rule className="icon" />
              <span className="">{item.size.size}</span>
            </div>
          )}
          <div className="flex items-center gap-x-2">
            <Icons.ShieldCheck className="icon" />
            <span className="font-light">正品保证和发货保证</span>
          </div>
          <div className="flex items-center gap-x-2">
            <Icons.Save className="icon text-sky-400" />
            <span className="font-light">仓库有售</span>
          </div>
          {item.discount > 0 ? (
            <DiscountCartItem discount={item.discount} price={item.price} />
          ) : (
            <div className="flex items-center gap-x-2">
              <span className="text-sm text-gray-700">{formatNumber(item.price)}</span>
              <span className="">¥</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default CartItem
