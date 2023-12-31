import { db } from '@/helpers'

import { Category, Banner, Slider } from 'models'

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  MostFavouraiteProducts,
  Slider as MainSlider,
} from 'components'

export const getData = async category => {
  await db.connect()

  const currentCategory = await Category.findOne({
    slug: category,
  }).lean()

  if (!currentCategory) return { notFound: true }

  const sliders = await Slider.find({ category_id: currentCategory?._id }).lean()

  const bannerOneType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'one',
  }).lean()
  const bannerTwoType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'two',
  }).lean()

  const childCategories = await Category.find({
    parent: currentCategory?._id,
  }).lean()

  await db.disconnect()
  return {
    currentCategory,
    sliders,
    bannerOneType,
    bannerTwoType,
    childCategories,
  }
}

const MainCategory = async ({ params: { category } }) => {
  const { currentCategory, sliders, bannerOneType, bannerTwoType, childCategories } =
    await getData(category)

  //? Render(s)
  return (
    <main className="container min-h-screen space-y-6 xl:mt-28">
      <div className="py-4 mx-auto space-y-12 xl:mt-28">
        <MainSlider data={sliders} />

        <DiscountSlider currentCategory={currentCategory} />

        <Categories
          childCategories={{ categories: childCategories, title: '分类' }}
          color={currentCategory.colors?.start}
          name={currentCategory.name}
        />

        <BannerOne data={bannerOneType} />

        <BestSellsSlider categorySlug={currentCategory.slug} />

        <BannerTwo data={bannerTwoType} />

        <MostFavouraiteProducts categorySlug={currentCategory.slug} />
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  await db.connect()

  const categories = await Category.find({
    level: 1,
  }).lean()

  await db.disconnect()

  const paths = categories.map(cat => ({ params: { category: cat.slug } }))
  return paths
}

export default MainCategory

export async function generateMetadata({ params: { category } }) {
  const { currentCategory, sliders, bannerOneType, bannerTwoType, childCategories } =
    await getData(category)

  return {
    title: `xxx精选 | ${currentCategory.name}`,
  }
}
