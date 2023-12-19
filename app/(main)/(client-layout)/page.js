// import { Metadata } from 'next'
import { bannerRepo, categoryRepo, sliderRepo } from '@/helpers'
import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  Slider as MainSlider,
  MostFavouraiteProducts,
} from '@/components'

export const metadata = {
  title: '首页',
}

export const revalidate = 20

export default async function Home({ searchParams }) {
  const currentCategory = await categoryRepo.getOne({
    parent: undefined,
  })
  const childCategories = await categoryRepo.getAll(
    {},
    {
      parent: currentCategory?._id,
    }
  )

  const sliders = await sliderRepo.getAll({}, { category_id: currentCategory?._id })

  const bannerOneType = await bannerRepo.getAll(
    {},
    {
      category_id: currentCategory?._id,
      type: 'one',
    }
  )
  const bannerTwoType = await bannerRepo.getAll(
    {},
    {
      category_id: currentCategory?._id,
      type: 'two',
    }
  )

  return (
    <main className="xl:mt-28 container space-y-24">
      <MainSlider data={sliders} />
      <DiscountSlider currentCategory={currentCategory} />
      <Categories
        childCategories={{ categories: childCategories, title: '分类' }}
        color={currentCategory.colors?.start}
        name={currentCategory.name}
        homePage
      />
      <BannerOne data={bannerOneType} />
      <BestSellsSlider categorySlug={currentCategory.slug} />
      <BannerTwo data={bannerTwoType} />
      <MostFavouraiteProducts categorySlug={currentCategory.slug} />
    </main>
  )
}
