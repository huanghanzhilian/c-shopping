import Link from 'next/link'

import { Icons } from 'components'

export default function Cart() {
  return (
    <>
      <Link href="/">
        <div className="relative">
          <span className="absolute outline outline-2 bottom-3.5 left-5 bg-red-500 rounded-md w-5 h-5 p-0.5 text-center text-xs text-white farsi-digits">
            0
          </span>

          <Icons.Cart className="icon h-7 w-7" />
        </div>
      </Link>
    </>
  )
}
