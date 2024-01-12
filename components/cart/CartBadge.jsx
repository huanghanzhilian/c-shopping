import { Icons } from 'components'

import { formatNumber } from 'utils'

import { useAppSelector } from 'hooks'

export default function CartBadge() {
  //? Store
  const { totalItems } = useAppSelector(state => state.cart)

  //? Render(s)
  return (
    <div className="relative">
      <span className="absolute outline outline-2 bottom-3.5 left-5 bg-red-500 rounded-md w-5 h-5 p-0.5 text-center text-xs text-white">
        {formatNumber(totalItems)}
      </span>

      <Icons.Cart className="icon h-7 w-7" />
    </div>
  )
}
