import { Icons } from 'components'

import { formatNumber } from 'utils'

const Depot = ({ inStock }) => {
  //? Render(s)
  if (inStock < 10 && inStock !== 0) {
    return <span className="text-red-500 farsi-digits">库存仅剩{formatNumber(inStock)}</span>
  } else if (inStock > 10) {
    return (
      <div className="flex text-teal-400 gap-x-1">
        <Icons.Save className="text-teal-400 icon" />
        <span className="text-teal-700">仓库有售</span>
      </div>
    )
  } else if (inStock === 0) {
    return null
  }
}

export default Depot
