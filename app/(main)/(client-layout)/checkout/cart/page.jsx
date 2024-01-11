'use client'
import { Fragment } from 'react'
import { useRouter } from 'next/navigation'

import { clearCart } from 'store'

import {
  Icons,
  FreeShipping,
  CartItem,
  CartInfo,
  Header,
  RedirectToLogin,
  Button,
  EmptyCart,
} from 'components'
import { Menu, Transition } from '@headlessui/react'

import { formatNumber } from 'utils'

import { useUserInfo, useDisclosure, useAppSelector, useAppDispatch } from 'hooks'

const CartPage = () => {
  //? Assets
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()

  //? Get User Data
  const { userInfo } = useUserInfo()

  //? Store
  const { cartItems, totalItems, totalPrice, totalDiscount } = useAppSelector(state => state.cart)

  //? Handlers
  const handleRoute = () => {
    if (!userInfo) return redirectModalHandlers.open()

    push('/checkout/shipping')
  }

  //? Local Components
  const DeleteAllDropDown = () => (
    <Menu as="div" className="dropdown">
      <Menu.Button className="dropdown__button">
        <Icons.More className="icon" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="w-32 dropdown__items ">
          <Menu.Item>
            <button onClick={() => dispatch(clearCart())} className="px-4 py-3 flex-center gap-x-2">
              <Icons.Delete className="icon" />
              <span>删除全部</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )

  //? Render(s)
  if (cartItems.length === 0)
    return (
      <>
        <section className="py-2 mx-auto mb-20 space-y-3 xl:mt-36 lg:mb-0 container lg:px-5 lg:mt-6 lg:space-y-0 lg:py-4 lg:border lg:border-gray-200 lg:rounded-md">
          <div className="section-divide-y" />

          <div className="py-20">
            <EmptyCart className="mx-auto h-52 w-52" />
            <p className="text-base font-bold text-center">您的购物车是空的！</p>
          </div>
        </section>
      </>
    )

  return (
    <>
      <RedirectToLogin
        title="您还没有登录"
        text=""
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
      <main className="container py-2 mx-auto mb-20 space-y-3 xl:mt-36 lg:py-0 lg:mb-0 b lg:px-5 lg:mt-6 lg:gap-x-3 lg:flex lg:flex-wrap lg:space-y-0">
        <div className="lg:py-4 lg:border lg:border-gray-200 lg:rounded-md lg:flex-1 h-fit">
          {/* title */}
          <section className="flex justify-between px-4">
            <div>
              <h3 className="mb-2 text-sm font-bold">您的购物车</h3>
              <span className="farsi-digits">{formatNumber(totalItems)} 商品</span>
            </div>
            <DeleteAllDropDown />
          </section>

          {/* carts */}
          <section className="divide-y">
            {cartItems.map(item => (
              <CartItem item={item} key={item.itemID} />
            ))}
          </section>
        </div>

        <div className="section-divide-y lg:hidden" />

        {/* cart Info */}
        <section className="lg:sticky lg:top-6 lg:h-fit xl:top-36">
          <div className="lg:border lg:border-gray-200 lg:rounded-md">
            <CartInfo handleRoute={handleRoute} cart />
          </div>
          <FreeShipping />
        </section>

        {/* to Shipping */}
        <section className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-3 bg-white border-t border-gray-300 shadow-3xl lg:hidden">
          <div>
            <span className="font-light">总计购物车</span>
            <div className="flex items-center">
              <span className="text-sm farsi-digits">
                {formatNumber(totalPrice - totalDiscount)}
              </span>
              <span className="ml-1">¥</span>
            </div>
          </div>
          <Button className="w-1/2" onClick={handleRoute}>
            继续
          </Button>
        </section>
      </main>
    </>
  )
}

export default CartPage
