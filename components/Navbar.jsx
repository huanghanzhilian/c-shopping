import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Icons, NavbarSkeleton, ResponsiveImage } from 'components'

import { useGetCategoriesQuery } from '@/store/services'

export default function Navbar() {
  //? Get Categories Query
  const { categories, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.data?.categories,
      isLoading,
    }),
  })

  //? State
  const [activeMinCat, setActiveMinCat] = useState({})
  const [hover, setHover] = useState(false)

  //? Handlers
  const handleActive = cat => {
    setActiveMinCat(cat)
  }
  const hanldeDeactive = () => {
    if (categories) setActiveMinCat(categories.filter(category => category.level === 1)[0])
  }

  //? Re-Renders
  useEffect(() => {
    if (categories) setActiveMinCat(categories?.filter(category => category.level === 1)[0])
  }, [categories])

  //? Render
  return (
    <div className="hidden lg:block group">
      <button
        className="flex-center text-sm px-2 gap-x-1"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Icons.Bars className="icon" />
        商品分类
      </button>
      <div
        className={`fixed left-0 z-20 w-full h-screen top-28 bg-gray-400/50 ${
          hover ? 'block' : 'hidden'
        }`}
      />

      <div
        className="absolute z-40 hidden w-full bg-white rounded-md shadow-lg border border-gray-100 top-8 group-hover:block"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => {
          hanldeDeactive()
          setHover(false)
        }}
      >
        <div className="flex">
          <ul className="border-l-2 border-gray-100 w-72">
            {isLoading ? (
              <NavbarSkeleton />
            ) : categories ? (
              categories
                .filter(category => category.level === 1)
                .map(levelOneCategory => (
                  <li
                    key={levelOneCategory._id}
                    className="w-full px-2 py-0.5 text-sm hover:bg-gray-100 group"
                    onMouseOver={() => handleActive(levelOneCategory)}
                  >
                    <Link
                      href={`/main/${levelOneCategory.slug}`}
                      className="px-3 py-3 flex gap-x-1.5 items-center"
                    >
                      <ResponsiveImage
                        dimensions="w-7 h-7"
                        className="grayscale"
                        src={levelOneCategory.image}
                        alt={levelOneCategory.name}
                      />

                      <span>{levelOneCategory.name}</span>
                    </Link>
                  </li>
                ))
            ) : null}
          </ul>
          <ul className="flex flex-wrap w-full gap-10 px-2 py-4">
            {isLoading
              ? null
              : activeMinCat
                ? categories?.map(levelTwoCategory => {
                    if (levelTwoCategory.parent === activeMinCat._id) {
                      return (
                        <li key={levelTwoCategory._id} className="h-fit">
                          <Link
                            href={`/products?category=${levelTwoCategory.slug}`}
                            className="flex-center px-2 mb-1 text-sm font-semibold tracking-wider text-gray-700 border-l-2 border-red-500"
                          >
                            {levelTwoCategory.name}
                            <Icons.ArrowRight2 className="icon" />
                          </Link>
                          <ul className="space-y-1">
                            {categories
                              .filter(category => category.parent === levelTwoCategory._id)
                              .map(levelThreeCategory => (
                                <li key={levelThreeCategory._id}>
                                  <Link
                                    href={`/products?category=${levelThreeCategory.slug}`}
                                    className="px-3 text-xs font-medium text-gray-700"
                                  >
                                    {levelThreeCategory.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                      )
                    }
                  })
                : null}
          </ul>
        </div>
      </div>
    </div>
  )
}
