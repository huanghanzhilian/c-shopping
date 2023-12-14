import { Metadata } from 'next'
import { db } from '@/helpers'
import { Banner, Category, Slider } from '@/models'
import { Slider as MainSlider } from '@/components'

export const metadata = {
  title: '首页',
}

export default async function Home({ searchParams }) {
  await db.connect()

  const currentCategory = await Category.findOne({
    parent: undefined,
  }).lean()
  const childCategories = await Category.find({
    parent: currentCategory?._id,
  }).lean()

  let sliders = await Slider.find({ category_id: currentCategory?._id })
    .lean()
    .exec()
  // sliders = JSON.parse(JSON.stringify(sliders))
  console.log('sliders', sliders)
  console.log('Array.isArray(sliders)', Array.isArray(sliders))

  const bannerOneType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'one',
  })
  const bannerTwoType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'two',
  })

  await db.disconnect()
  return (
    <main className="xl:mt-28 container">
      <MainSlider data={sliders} />
    </main>
  )
}
