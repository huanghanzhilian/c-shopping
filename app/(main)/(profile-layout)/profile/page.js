'use client'

import { Orders } from '@/components'
import { useSelector } from 'react-redux'

export default function ProfilePage() {
  const { user } = useSelector(state => state.user)

  return (
    <>
      <Orders />
    </>
  )
}
