'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import { Disclosure } from '@headlessui/react'
import { Icons, SidebarSkeleton, LogoH } from 'components'

import { useDisclosure } from 'hooks'

import { useGetCategoriesQuery } from '@/store/services'

export default function Sidebar() {
  //? Assets
  const [isSidebar, sidebarHandlers] = useDisclosure()

  //? Get Categories Query
  const { categoriesList, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categoriesList: data?.data?.categoriesList,
      isLoading,
    }),
  })

  //? Handlers
  const handleClose = () => sidebarHandlers.close()

  //? Re-Renders
  //*    prevent scroll
  useEffect(() => {
    if (isSidebar) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isSidebar])

  //? Render(s)
  return (
    <>
      <button className="p-1 lg:hidden" type="button" onClick={sidebarHandlers.open}>
        <Icons.Bars className="icon" />
      </button>
      <div
        className={`w-full h-screen fixed duration-200 z-10 top-0 lg:hidden ${
          isSidebar ? 'right-0' : '-right-full'
        } `}
      >
        <div
          className={`${
            isSidebar ? 'opacity-100 visible duration-300 delay-200' : 'opacity-0 invisible '
          }  bg-gray-100/50  z-10 w-full h-full`}
          onClick={sidebarHandlers.close}
        />

        <div className="overflow-y-auto absolute py-4 top-0 right-0 z-20 w-3/4 h-screen max-w-sm space-y-4 bg-white">
          <LogoH className="h-10 ml-3 w-28" />
          <h5 className="p-3 border-t-2  border-gray-200">商品分类</h5>
          {isLoading ? (
            <SidebarSkeleton />
          ) : categoriesList ? (
            <div>
              {categoriesList.children &&
                categoriesList.children.map(category => (
                  <Disclosure key={category._id}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between px-4 py-2 w-full !mt-0">
                          <span
                            className={`pl-3 font-semibold tracking-wide ${
                              open ? 'text-red-400' : 'text-gray-600'
                            }`}
                          >
                            {category.name}
                          </span>

                          <Icons.ArrowDown
                            className={` ${
                              open ? 'rotate-180 transform text-red-400 ' : 'text-gray-700'
                            } w-7 h-7 bg-gray-50 rounded-2xl`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className=" text-sm bg-gray-100 text-gray-500 !mt-0">
                          <Link
                            href={`/main/${category.slug}`}
                            className="py-2 text-gray-500 inline-flex items-center text-sm max-w-max pl-7"
                            onClick={handleClose}
                          >
                            此类别所有分类
                            <Icons.ArrowRight2 className="text-gray-500 icon" />
                          </Link>
                          {category?.children &&
                            category.children.map(category => (
                              <Disclosure key={category._id}>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className="flex items-center justify-between px-4 py-2 w-full !mt-0 pr-7">
                                      <span
                                        className={`font-medium text-md ${
                                          open ? 'text-red-400' : 'text-gray-600'
                                        }`}
                                      >
                                        {category.name}
                                      </span>
                                      <Icons.ArrowDown
                                        className={` ${
                                          open
                                            ? 'rotate-180 transform text-red-400 '
                                            : 'text-gray-700'
                                        } w-7 h-7 bg-gray-50 rounded-2xl`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel
                                      className={`px-4 pt-2 pb-1 text-sm text-gray-500 !mt-0 
                                     ${open ? 'border-b border-gray-50' : ''}
                                    `}
                                    >
                                      <Link
                                        href={`/products?category=${category.slug}`}
                                        className="py-2 text-gray-500 inline-flex items-center text-sm max-w-max pl-9"
                                        onClick={handleClose}
                                      >
                                        此类别所有分类
                                        <Icons.ArrowLeft className="text-gray-500 icon" />
                                      </Link>
                                      {category.children &&
                                        category.children.map(category => (
                                          <Link
                                            key={category._id}
                                            href={`/products?category=${category.slug}`}
                                            className="pr-9 py-2.5 my-2 font-normal tracking-wide block"
                                            onClick={handleClose}
                                          >
                                            {category.name}
                                          </Link>
                                        ))}
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
