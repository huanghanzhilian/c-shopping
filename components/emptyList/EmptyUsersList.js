import { Icons } from 'components'

export default function EmptyUsersList() {
  return (
    <div className="py-20">
      <Icons.Users className="w-10 h-10 text-red-400" />
      <p className="text-center">用完为空</p>
    </div>
  )
}
