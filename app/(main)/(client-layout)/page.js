import { Metadata } from 'next'
import { bannerRepo, categoryRepo, sliderRepo } from '@/helpers'
import { Slider as MainSlider } from '@/components'

export const metadata = {
  title: '首页',
}

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

  console.log('currentCategory', currentCategory)
  console.log('childCategories', childCategories)
  console.log('sliders', sliders)
  console.log('bannerOneType', bannerOneType)
  console.log('bannerTwoType', bannerTwoType)

  return (
    <main className="xl:mt-28 container">
      <MainSlider data={sliders} />
    </main>
  )
}
