'use client'

import { useState, useEffect } from 'react'

import { addToCart, showAlert } from 'store'

import { existItem } from 'utils'

import { ArrowLink, ProductPrice, CartButtons } from 'components'

import { useAppDispatch, useAppSelector } from 'hooks'

const AddToCartOperation = props => {
  //? Props
  const { product } = props

  //? Assets
  const dispatch = useAppDispatch()

  //? Store
  const { cartItems, tempColor, tempSize } = useAppSelector(state => state.cart)

  //? State
  const [currentItemInCart, setCurrentItemInCart] = useState(undefined)

  //? Re-Renders
  useEffect(() => {
    const item = existItem(cartItems, product._id, tempColor, tempSize)
    setCurrentItemInCart(item)
  }, [tempColor, tempSize, cartItems])

  //? handlers
  const handleAddItem = () => {
    if (product.inStock === 0)
      return dispatch(
        showAlert({
          status: 'error',
          title: '此商品缺货',
        })
      )

    dispatch(
      addToCart({
        productID: product._id,
        name: product.title,
        price: product.price,
        discount: product.discount,
        inStock: product.inStock,
        sold: product.sold,
        color: tempColor,
        size: tempSize,
        img: product.images[0],
        quantity: 1,
      })
    )
  }

  //? Render(s)
  return (
    <div className="flex items-center justify-between p-3 bg-white border-t border-gray-300 sm:px-5 lg:py-3 lg:p-0 shadow-3xl lg:sticky lg:flex-col-reverse lg:top-32 lg:bg-gray-100 lg:gap-y-4 lg:border-t-0 lg:shadow-none">
      {currentItemInCart ? (
        <div className="flex w-full gap-x-4">
          <div className="w-44 lg:w-1/2 ">
            <CartButtons item={currentItemInCart} />
          </div>
          <div className="hidden lg:block">
            <ArrowLink path="/checkout/cart">查看购物车</ArrowLink>
          </div>
        </div>
      ) : (
        <button onClick={handleAddItem} className="px-12 text-sm lg:w-full btn">
          添加到购物车
        </button>
      )}

      <div className="lg:self-end min-w-fit">
        <ProductPrice
          inStock={product.inStock}
          discount={product.discount}
          price={product.price}
          singleProduct
        />
      </div>
    </div>
  )
}

export default AddToCartOperation
