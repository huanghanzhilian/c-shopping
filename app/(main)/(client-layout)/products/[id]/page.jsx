import { useRouter } from 'next/navigation'

import { Product } from 'models'

// import { useAppDispatch } from 'hooks'

import { setTempColor, setTempSize, addToLastSeen } from 'store'

import {
  FreeShipping,
  Services,
  SmilarProductsSlider,
  ImageGallery,
  Description,
  Specification,
  Reviews,
  SelectColor,
  SelectSize,
  OutOfStock,
  AddToCart,
  Info,
  Breadcrumb,
} from 'components'
import { db } from '@/helpers'

const SingleProduct = async ({ params }) => {
  await db.connect()
  const product = JSON.parse(
    JSON.stringify(
      await Product.findById({ _id: params?.id })
        .populate('category_levels.level_one')
        .populate('category_levels.level_two')
        .populate('category_levels.Level_three')
        .lean()
    )
  )

  if (!product) return { notFound: true }

  const productCategoryID = product.category.pop()

  const products = await Product.find({
    category: { $in: productCategoryID },
    inStock: { $gte: 1 },
    _id: { $ne: product._id },
  })
    .select(
      '-description -info -specification -category -category_levels -sizes  -reviews -numReviews'
    )
    .limit(11)
    .lean()

  const smilarProducts = {
    title: 'کالاهای مشابه',
    products,
  }
  console.log('product', product)

  return (
    <main className="xl:mt-28 container mx-auto py-4 space-y-4">
      <Breadcrumb categoryLevels={product.category_levels} />

      <div className="h-fit lg:h-fit lg:grid lg:grid-cols-9 lg:px-4 lg:gap-x-2 lg:gap-y-4 lg:mb-10 xl:gap-x-7">
        <ImageGallery
          images={product.images}
          discount={product.discount}
          inStock={product.inStock}
          productName={product.title}
        />
        <div className="lg:col-span-4 ">
          {/* title */}
          <h2 className="p-3 text-base font-semibold leading-8 tracking-wide text-black/80 ">
            {product.title}
          </h2>

          <div className="section-divide-y" />

          {product.inStock > 0 && product.colors.length > 0 && (
            <SelectColor colors={product.colors} />
          )}

          {product.inStock > 0 && product.sizes.length > 0 && <SelectSize sizes={product.sizes} />}

          {product.inStock === 0 && <OutOfStock />}

          <Info infos={product?.info} />

          <FreeShipping />
        </div>
      </div>
    </main>
  )
}

export default SingleProduct
