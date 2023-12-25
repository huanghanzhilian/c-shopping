import { decrease, increase, removeFromCart } from 'store'
import { useDispatch } from 'react-redux'

import { Icons } from 'components'

import { formatNumber } from 'utils'

const CartButtons = props => {
  //? Props
  const { item } = props

  //? Assets
  const dispatch = useDispatch()

  //? Render(s)
  return (
    <div className="flex items-center py-2 text-sm rounded-md shadow-3xl justify-evenly">
      <button className="active:scale-90" type="button">
        <Icons.Plus onClick={() => dispatch(increase(item.itemID))} className="text-red-500 icon" />
      </button>

      <span className="text-sm farsi-digits min-w-[22px] text-center">
        {formatNumber(item.quantity)}
      </span>

      {item.quantity === 1 ? (
        <button className="active:scale-90" type="button">
          <Icons.Delete
            onClick={() => dispatch(removeFromCart(item.itemID))}
            className="text-red-500 icon"
          />
        </button>
      ) : (
        <button className="active:scale-90" type="button">
          <Icons.Minus
            onClick={() => dispatch(decrease(item.itemID))}
            className="text-red-500 icon"
          />
        </button>
      )}
    </div>
  )
}

export default CartButtons
