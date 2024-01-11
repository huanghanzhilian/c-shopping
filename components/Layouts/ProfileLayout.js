import { useRouter } from 'next/navigation'

import { Header, ProfileAside } from 'components'

import { useVerify } from 'hooks'

export default function ProfileLayout({ children }) {
  const isVerify = useVerify()
  const router = useRouter()

  if (!isVerify) router.push('/')
  else
    return (
      <>
        <Header />
        <div className="lg:flex lg:gap-x-4 lg:px-3 container xl:mt-28">
          <div className="hidden lg:block">
            <ProfileAside />
          </div>
          <div className="flex-1 py-4 lg:py-8 lg:border lg:border-gray-200 lg:rounded-md lg:mt-6 h-fit">
            {children}
          </div>
        </div>
      </>
    )
}
