import { useRouter } from 'next/navigation'

import { DashboardAside } from 'components'

import { useUserInfo } from 'hooks'

export default function DashboardLayout({ children }) {
  const router = useRouter()

  const { userInfo, isVerify } = useUserInfo()

  if (!isVerify || userInfo?.role === 'user') router.push('/admin/authentication/login')

  if (userInfo?.role === 'admin' || userInfo?.root)
    return (
      <div className="lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-8xl">
        <div className="hidden lg:block">
          <DashboardAside />
        </div>
        <div className="flex-1 lg:py-8 lg:border lg:border-gray-200 lg:rounded-md lg:mt-6 h-fit">
          {children}
        </div>
      </div>
    )
}
