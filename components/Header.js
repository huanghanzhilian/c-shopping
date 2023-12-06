import Link from 'next/link'
import { Logo, Icons, Search, Signup, Cart } from 'components'
export default function Header() {
  return (
    <>
      <header className="px-4 bg-white lg:shadow xl:fixed xl:z-20 xl:top-0 xl:left-0 xl:right-0">
        <div className="container lg:flex lg:py-2">
          <div className="inline-flex items-center justify-between w-full border-b lg:border-b-0 lg:max-w-min lg:mr-8">
            <Icons.Question className="icon lg:hidden" />
            <Link passHref href="/">
              {/* <Logo className="w-24 h-14" /> */}
              <div className="w-24 h-14 bg-red-200"></div>
            </Link>
            <div className="icon lg:hidden">三</div>
          </div>
          <div className="inline-flex items-center justify-between w-full py-2 border-b gap-x-10 lg:border-b-0">
            <Search className="flex flex-grow gap-x-7" />
            <div className="inline-flex items-center gap-x-4 pr-4">
              <Signup />
              <span className="hidden lg:block bg-gray-300 w-0.5 h-8" />
              <Cart />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
