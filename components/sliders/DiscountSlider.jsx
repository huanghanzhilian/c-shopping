import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { AmazingTypo, DiscountProduct, ProductPrice, ResponsiveImage, Skeleton } from 'components'
import { useGetProductsQuery } from '@/store/services'

const DiscountSlider = props => {
  //? Props
  const { currentCategory } = props

  const { products, isLoading } = useGetProductsQuery(
    {
      sort: 6,
      category: currentCategory?.slug,
      page_size: 15,
      discount: true,
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        products: data?.data?.products,
        isLoading,
      }),
    }
  )

  //? Render(s)

  if (currentCategory) {
    return (
      <section
        className="lg:rounded-xl lg:mx-3 py-2.5 flex lg:px-1"
        style={{
          background: `linear-gradient(${`${currentCategory.colors?.start},${currentCategory.colors?.end}`})`,
        }}
      >
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={2}
          breakpoints={{
            490: { width: 490, slidesPerView: 3 },
          }}
        >
          {isLoading
            ? Array(10)
                .fill('_')
                .map((_, index) => (
                  <SwiperSlide
                    key={index}
                    className={`w-fit  bg-white mx-0.5 py-6 ${
                      index === 0 ? 'rounded-r-lg' : index === 9 ? 'rounded-l-lg' : ''
                    } `}
                  >
                    <Skeleton.Items>
                      <Skeleton.Item
                        height=" h-32 lg:h-36"
                        width="w-32 lg:w-36"
                        animated="background"
                        className="rounded-md mx-auto"
                      />
                      <Skeleton.Item
                        height="h-5"
                        width="w-32"
                        animated="background"
                        className="mt-4 mx-auto"
                      />
                      <Skeleton.Item
                        height="h-5"
                        width="w-20"
                        animated="background"
                        className="mt-4 mx-auto"
                      />
                    </Skeleton.Items>
                  </SwiperSlide>
                ))
            : products?.map((product, index) => (
                <SwiperSlide
                  key={product._id}
                  className={`w-fit  bg-white mx-0.5 py-6 ${
                    index === 0 ? 'rounded-r-lg' : index === 9 ? 'rounded-l-lg' : ''
                  } `}
                >
                  <Link href={`/products/${product._id}`}>
                    <article>
                      <ResponsiveImage
                        dimensions="w-32 h-32 lg:w-36 lg:h-36"
                        className=" mx-auto"
                        src={product.images[0].url}
                        alt={product.title}
                      />

                      <div className="flex px-2 mt-1.5 justify-evenly gap-x-2 ">
                        <div>
                          <DiscountProduct discount={product.discount} />
                        </div>
                        <ProductPrice
                          inStock={product.inStock}
                          discount={product.discount}
                          price={product.price}
                        />
                      </div>
                    </article>
                  </Link>
                </SwiperSlide>
              ))}
          <SwiperSlide className="py-10 flex-center flex-col">
            <Image
              src={currentCategory.image}
              alt={currentCategory.name}
              width={96}
              height={96}
              priority
            />
            <div className=" text-white text-sm">查看全部</div>
          </SwiperSlide>
        </Swiper>
      </section>
    )
  }
}

export default DiscountSlider
