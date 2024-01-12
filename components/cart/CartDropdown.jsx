import { Fragment } from 'react'
import { useRouter } from 'next/navigation'

import { formatNumber } from 'utils'

import { useUserInfo, useDisclosure, useAppSelector } from 'hooks'

import { Menu, Transition } from '@headlessui/react'
import { ArrowLink, CartItem, RedirectToLogin, Button, CartBadge, EmptyCart } from 'components'

export default function CartDropdown() {
  //? Assets
  const { push } = useRouter()

  const { isVerify } = useUserInfo()

  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()

  //? Store
  const { totalItems, cartItems, totalDiscount, totalPrice } = useAppSelector(state => state.cart)

  //? Handlers
  const handleRoute = () => {
    if (!isVerify) return redirectModalHandlers.open()

    push('/checkout/shipping')
  }

  //? Render(s)
  return (
    <>
      <RedirectToLogin
        title="您尚未登录"
        text=""
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />

      <Menu as="div" className="dropdown">
        <Menu.Button className="dropdown__button">
          <CartBadge />
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
          <Menu.Items className="dropdown__items w-[440px]">
            {totalItems > 0 ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-4">
                  <span className="">{totalItems} 件商品</span>
                  <ArrowLink path="/checkout/cart">查看购物车</ArrowLink>
                </div>
                {/* Itmes */}
                <div className="mx-1 overflow-y-auto divide-y divide-gray-50 h-80">
                  {cartItems.map(item => (
                    <CartItem item={item} key={item.itemID} />
                  ))}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t">
                  <div>
                    <span>应付金额</span>
                    <div className="flex-center">
                      <span className="text-sm">{formatNumber(totalPrice - totalDiscount)}</span>
                      <span className="ml-1">¥</span>
                    </div>
                  </div>

                  <Button onClick={handleRoute}>去支付</Button>
                </div>
              </>
            ) : (
              <>
                <EmptyCart className="mx-auto h-44 w-44" />
                <p className="pt-2 text-base font-bold text-center">你的购物车是空的！</p>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
