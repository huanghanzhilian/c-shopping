'use client'
import { useEffect } from 'react'
import Image from 'next/image'

import { useDispatch, useSelector } from 'react-redux'
import { removeAlert } from 'store'

export default function Alert() {
  //? Store
  const { isShow, status, title } = useSelector(state => state.alert)

  //? Assets
  const dispatch = useDispatch()
  let IconSrc
  switch (status) {
    case 'error':
      IconSrc = '/icons/error.svg'
      break
    case 'success':
      IconSrc = '/icons/success.svg'
      break
    case 'exclamation':
      IconSrc = '/icons/exclamation.svg'
      break
    case 'question':
      IconSrc = '/icons/question.svg'
      break
    default:
      IconSrc = '/icons/nothing.svg'
      break
  }

  //? Re-Renders
  useEffect(() => {
    if (isShow) {
      const timeout = setTimeout(() => {
        dispatch(removeAlert())
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [isShow])

  //? Render(s)
  return (
    <div
      className={`${
        isShow ? 'opacity-100 visible' : 'opacity-0 invisible '
      } transition-all duration-500 fixed inset-0 z-40`}
    >
      <div className="w-full h-full bg-gray-400/20" onClick={() => dispatch(removeAlert())} />
      <div
        className={`${
          isShow ? 'top-40' : '-top-full'
        } max-w-md fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className="p-3 mx-2 text-center bg-white rounded-md shadow h-fit">
          <Image className="mx-auto" src={IconSrc} width="80" height="80" alt={status} />
          <p className="mt-2">{title}</p>
        </div>
      </div>
    </div>
  )
}
