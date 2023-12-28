'use client'

import { useAppDispatch } from '@/hooks'

import { setTempColor, setTempSize, addToLastSeen } from '@/store'
import { useEffect } from 'react'

const InitialStore = props => {
  const { product } = props

  const dispatch = useAppDispatch()

  if (product.colors.length > 0) {
    dispatch(setTempColor(product?.colors[0]))
    dispatch(setTempSize(null))
  } else if (product.sizes.length > 0) {
    dispatch(setTempSize(product?.sizes[0]))
    dispatch(setTempColor(null))
  } else {
    dispatch(setTempColor(null))
    dispatch(setTempSize(null))
  }
  useEffect(() => {
    dispatch(
      addToLastSeen({
        productID: product._id,
        image: product.images[0],
        title: product.title,
      })
    )
  }, [product._id])
  return null
}

export default InitialStore
