import Image from 'next/image'

import { AddToCartOperation, Depot, Icons, ResponsiveImage } from 'components'

import { formatNumber } from 'utils'

import { useAppSelector } from 'hooks'

const AddToCart = props => {
  //? Props
  const { second, product } = props

  //? Store
  const { tempColor, tempSize } = useAppSelector(state => state.cart)

  //? Render(s)
  return (
    <>
      {/* mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-20 lg:hidden">
        <AddToCartOperation product={product} />
      </div>

      {/* desktop */}
      <div
        className={`hidden divide-y lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-5 lg:rounded-lg lg:bg-gray-100 lg:flex lg:flex-col   xl:row-end-5 lg:px-3 lg:py-1.5 lg:border lg:border-gray-200 lg:shadow lg:sticky ${
          second ? 'lg:top-4 xl:top-32' : 'lg:top-60 xl:top-[260px]'
        } `}
      >
        <div className="items-center justify-between hidden space-y-2 lg:py-3 lg:flex">
          <span className="text-base text-black">卖方 :</span>
          <div className="flex gap-x-2">
            <Image src="/icons/mini-logo.png" width={24} height={24} alt="xxx" />
            <span>xxx</span>
          </div>
        </div>
        {second && (
          <>
            <div className="flex py-3 gap-x-4 ">
              <ResponsiveImage
                dimensions="w-28 h-28"
                src={product.images[0].url}
                alt={product.title}
              />

              <span className="flex-1 text-justify">{product.title}</span>
            </div>

            {tempColor && (
              <div className="flex items-center gap-x-2 py-3">
                <span
                  className="inline-block w-5 h-5 shadow rounded-xl"
                  style={{ background: tempColor.hashCode }}
                />
                <span>{tempColor.name}</span>
              </div>
            )}
            {tempSize && (
              <div className="flex items-center gap-x-2 py-3">
                <Icons.Rule className="icon" />
                <span className="farsi-digits">{tempSize.size}</span>
              </div>
            )}
          </>
        )}

        <div className="py-3 lg:items-center lg:gap-x-2 lg:flex">
          <Icons.ShieldCheck className="icon" />
          <span className="font-light">正品保证和发货保证</span>
        </div>

        <div className="lg:block lg:py-3 ">
          <Depot inStock={product.inStock} />
        </div>

        <div className="lg:flex lg:items-center lg:gap-x-1 lg:py-3">
          <Icons.Check className="icon" />
          <span> 销售 :</span>
          <span className="farsi-digits">{formatNumber(product.sold)}</span>
        </div>

        <AddToCartOperation product={product} />
      </div>
    </>
  )
}

export default AddToCart
