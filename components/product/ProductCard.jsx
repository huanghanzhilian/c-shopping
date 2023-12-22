import {
  Icons,
  SpecialSell,
  DiscountProduct,
  ProductPrice,
  Depot,
  ResponsiveImage,
} from 'components'
import { truncate } from 'utils'

const ProductCard = props => {
  //? Props
  const { product, slide } = props

  //? Render(s)
  return (
    <a target="_blank" href={`/products/${product._id}`}>
      <article
        className={`pt-2 pb-3 border-b border-gray-100 sm:h-[540px] xl:h-[470px] sm:px-3 ${
          !slide && 'sm:border sm:hover:shadow-3xl'
        }`}
      >
        <SpecialSell discount={product.discount} inStock={product.inStock} />
        <div className="flex items-center gap-4 sm:flex-col">
          <div className="sm:flex sm:p-1 ">
            <ResponsiveImage
              dimensions="h-[28vw] w-[26vw] sm:w-56 sm:h-60 sm:mb-8 xl:w-44 xl:h-48"
              src={product.images[0].url}
              alt={product.title}
            />

            <div className="p-2 flex gap-1.5 items-center sm:flex-col sm:items-end">
              {product.colors &&
                product.inStock !== 0 &&
                product.colors
                  .slice(0, 3)
                  .map(color => (
                    <span
                      key={color.id}
                      className="inline-block w-2.5 h-2.5 rounded-xl border-gray-300 shadow border "
                      style={{ background: color.hashCode }}
                    ></span>
                  ))}
              {product.colors.length > 3 && product.inStock !== 0 && (
                <Icons.Plus className="w-3 h-3 mr-1 sm:mr-0" />
              )}
            </div>
          </div>
          <div className="flex-1 space-y-5 sm:w-full">
            <h2 className="hidden text-xs leading-6 text-gray-800 break-all h-14 xl:block">
              {truncate(product.title, 70)}
            </h2>
            <h2 className="text-xs leading-6 text-gray-800 h-14 xl:hidden">
              {truncate(product.title, 90)}
            </h2>
            <div className="flex justify-between">
              <div>
                <Depot inStock={product.inStock} />
              </div>
              <div className="flex items-center gap-x-1">
                <span className="farsi-digits">{product.rating.toFixed(1)}</span>
                <Icons.Star className="icon text-amber-400" />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                {product.discount > 0 && product.inStock !== 0 && (
                  <DiscountProduct discount={product.discount} />
                )}
              </div>
              {product.inStock !== 0 ? (
                <ProductPrice
                  inStock={product.inStock}
                  discount={product.discount}
                  price={product.price}
                />
              ) : (
                <span className="h-12 my-0.5">不可用</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </a>
  )
}

export default ProductCard
