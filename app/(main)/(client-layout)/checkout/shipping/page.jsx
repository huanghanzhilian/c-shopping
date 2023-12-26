'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { clearCart, showAlert } from 'store'

import { useCreateOrderMutation } from '@/store/services'

import {
  Button,
  CartInfo,
  HandleResponse,
  Icons,
  ResponsiveImage,
  WithAddressModal,
} from 'components'

import { formatNumber } from 'utils'

import { useAppDispatch, useAppSelector, useUserInfo } from 'hooks'

const ShippingPage = () => {
  //? Assets
  const router = useRouter()
  const dispatch = useAppDispatch()

  //? Get User Data
  const { userInfo } = useUserInfo()

  //? States
  const [paymentMethod, setPaymentMethod] = useState('在线支付')

  //? Store
  const { cartItems, totalItems, totalDiscount, totalPrice } = useAppSelector(state => state.cart)

  //? Create Order Query
  const [postData, { data, isSuccess, isError, isLoading, error }] = useCreateOrderMutation()

  //? Handlers
  const handleCreateOrder = () => {
    if (
      !userInfo?.address?.city &&
      !userInfo?.address?.province &&
      !userInfo?.address?.street &&
      !userInfo?.address?.postalCode
    )
      return dispatch(
        showAlert({
          status: 'error',
          title: '请填写您的地址',
        })
      )
    else
      postData({
        body: {
          address: {
            city: userInfo.address.city.name,
            postalCode: userInfo.address.postalCode,
            provinces: userInfo.address.province.name,
            street: userInfo.address.street,
          },
          mobile: userInfo.mobile,
          cart: cartItems,
          totalItems,
          totalPrice,
          totalDiscount,
          paymentMethod,
        },
      })
  }

  //? Local Components
  const ChangeAddress = () => {
    const BasicChangeAddress = ({ addressModalProps }) => {
      const { openAddressModal } = addressModalProps || {}
      return (
        <button type="button" onClick={openAddressModal} className="flex items-center mr-auto">
          <span className="text-base text-sky-500">改变| 编辑</span>
          <Icons.ArrowLeft className="icon text-sky-500" />
        </button>
      )
    }

    return (
      <WithAddressModal>
        <BasicChangeAddress />
      </WithAddressModal>
    )
  }

  //? Render(s)
  return (
    <>
      {/*  Handle Create Order Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={() => {
            dispatch(clearCart())
            router.push('/profile')
          }}
        />
      )}

      <main className="py-2 mx-auto space-y-3 xl:mt-28 container">
        {/* header */}
        <header className="lg:border lg:border-gray-200 lg:rounded-lg">
          <Link href="/">
            <div className="w-24 h-12 mx-auto bg-red-200"></div>
          </Link>
          <div className="flex items-center justify-evenly">
            <Link href="/checkout/cart" className="flex flex-col items-center gap-y-2">
              <Icons.Cart className="text-red-300 icon" />
              <span className="font-normal text-red-300">购物车</span>
            </Link>

            <div className="h-[1px] w-8  bg-red-300" />
            <div className="flex flex-col items-center gap-y-2">
              <Icons.Wallet className="w-6 h-6 text-red-500 icon" />
              <span className="text-base font-normal text-red-500">付款方式</span>
            </div>
          </div>
        </header>

        <div className="section-divide-y lg:hidden" />

        <div className="lg:flex lg:gap-x-3">
          <div className="lg:flex-1">
            {/* address */}
            <section className="flex items-center px-3 py-4 lg:border lg:border-gray-200 lg:rounded-lg gap-x-3">
              <Icons.Location2 className="text-black w-7 h-7" />
              <div className="space-y-2">
                <span className="">订单送货地址</span>
                <p className="text-base text-black">{userInfo?.address?.street}</p>
                <span className="text-sm">{userInfo?.name}</span>
              </div>
              <ChangeAddress />
            </section>

            <div className="section-divide-y lg:hidden" />

            {/* products */}
            <section className="px-2 py-4 mx-3 border border-gray-200 rounded-lg lg:mx-0 lg:mt-3 ">
              <div className="flex mb-5">
                <Image src="/icons/car.png" className="ml-4" width={40} height={40} alt="提交" />
                <div>
                  <span className="text-base text-black">正常发货</span>
                  <span className="block">有现货</span>
                </div>
                <span className="inline-block px-2 py-1 mr-3 bg-gray-100 rounded-lg farsi-digits h-fit">
                  {formatNumber(totalItems)} 商品
                </span>
              </div>
              <div className="flex flex-wrap justify-start gap-x-8 gap-y-5">
                {cartItems.map(item => (
                  <article key={item.itemID}>
                    <ResponsiveImage dimensions="w-28 h-28" src={item.img.url} alt={item.name} />

                    {item.color && (
                      <div className="flex items-center gap-x-2 mr-3 mt-1.5">
                        <span
                          className="inline-block w-4 h-4 shadow rounded-xl"
                          style={{ background: item.color.hashCode }}
                        />
                        <span>{item.color.name}</span>
                      </div>
                    )}

                    {item.size && (
                      <div className="flex items-center gap-x-2">
                        <Icons.Rule className="icon" />
                        <span>{item.size.size}</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <Link href="/checkout/cart" className="inline-block mt-6 text-sm text-sky-500">
                返回购物车
              </Link>
            </section>
          </div>

          <div className="section-divide-y lg:hidden" />

          {/* cart info */}
          <section className="lg:border lg:border-gray-200 lg:rounded-md lg:h-fit">
            <CartInfo />
            <div className="px-3 py-2 space-y-3">
              <div className="flex items-center gap-x-2 ">
                <input
                  type="radio"
                  name="cash"
                  id="cash"
                  value="在线付款"
                  checked={paymentMethod === '在线付款'}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <label className="text-sm" htmlFor="cash">
                  在线付款
                </label>
              </div>
              <div className="flex items-center gap-x-2 ">
                <input
                  type="radio"
                  name="zarinPal"
                  id="zarinPal"
                  value="银行卡"
                  disabled={true}
                  checked={paymentMethod === '银行卡'}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <label className="text-sm" htmlFor="zarinPal">
                  银行卡
                </label>
              </div>
              <Button
                onClick={handleCreateOrder}
                isLoading={isLoading}
                className="w-full max-w-5xl mx-auto"
              >
                完成购买
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default ShippingPage
