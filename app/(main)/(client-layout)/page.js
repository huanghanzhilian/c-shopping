// import { Metadata } from 'next'
import { bannerRepo, categoryRepo, sliderRepo } from '@/helpers'
import { BannerOne, BannerTwo, Categories, Slider as MainSlider } from '@/components'

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

  // console.log('childCategories', childCategories)

  return (
    <main className="xl:mt-28 container space-y-24">
      <MainSlider data={sliders} />
      <Categories
        childCategories={{ categories: childCategories, title: '分类' }}
        color={currentCategory.colors?.start}
        name={currentCategory.name}
        homePage
      />
      <BannerOne data={bannerOneType} />
      <BannerTwo data={bannerTwoType} />
    </main>
  )
}
