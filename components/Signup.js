import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Icons } from '.'

export default function Signup() {
  const pathname = usePathname()
  return (
    <div className="flex-center text-sm gap-x-3 lg:border lg:border-gray-300 lg:rounded-md lg:py-2 lg:px-3">
      <Link href={`/register?redirectTo=${pathname}`} className="hidden px-2 lg:block">
        注册
      </Link>
      <span className="hidden lg:block lg:bg-gray-300 w-0.5 lg:h-6" />
      <Link href={`/login?redirectTo=${pathname}`} className="flex-center gap-x-1">
        登录
        <Icons.Login className="icon" />
      </Link>
    </div>
  )
}
