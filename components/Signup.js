import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Icons, Skeleton, UserDropdown } from 'components'

import { useUserInfo } from 'hooks'

export default function Signup() {
  const asPath = usePathname()
  const { userInfo, isVerify, isLoading } = useUserInfo()

  //? Render(s)
  if (isLoading) return <Skeleton.Item height="h-8" width="w-7 lg:w-12" animated="background" />
  else if (!isVerify) {
    return (
      <div className="flex-center text-sm gap-x-3 lg:border lg:border-gray-300 lg:rounded-md lg:py-2 lg:px-3">
        <Link href={`/register?redirectTo=${asPath}`} className="hidden px-2 lg:block">
          注册
        </Link>
        <span className="hidden lg:block lg:bg-gray-300 w-0.5 lg:h-6" />
        <Link href={`/login?redirectTo=${asPath}`} className="flex-center gap-x-1">
          登录
          <Icons.Login className="icon" />
        </Link>
      </div>
    )
  } else if (userInfo) {
    return (
      <>
        <div className="lg:hidden">
          <Link href="/profile">
            <Icons.User className="icon h-7 w-7" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <UserDropdown name={userInfo.name} />
        </div>
      </>
    )
  }
}
