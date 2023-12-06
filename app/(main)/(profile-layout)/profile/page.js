'use client'

import { useSelector } from 'react-redux'

export default function ProfilePage() {
  const { user } = useSelector(state => state.user)

  return (
    <>
      <div className="px-4">hello</div>
    </>
  )
}
