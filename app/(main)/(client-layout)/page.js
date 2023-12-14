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

  const sliders = await Slider.find({ category_id: currentCategory?._id })
  // console.log('sliders', sliders)
  console.log('sliders', sliders)
  console.log('sliders toObject', sliders[0].toObject())
  console.log('sliders toJSON', sliders[0].toJSON())
  // console.log('JSON.parse(JSON.stringify())', JSON.parse(JSON.stringify(currentCategory)))
  // console.log('currentCategory lean', currentCategory.lean())

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
