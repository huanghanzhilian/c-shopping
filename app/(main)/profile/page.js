'use client'

import { Orders } from '@/components'
import { useTitle } from '@/hooks'
import { useSelector } from 'react-redux'

export default function ProfilePage() {
  useTitle('xxx 用户中心')
  const { user } = useSelector(state => state.user)

  return (
    <>
      <Orders />
    </>
  )
}
