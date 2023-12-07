import { OrderEmpty } from 'components'

export default function EmptyCommentsList() {
  return (
    <div className="py-20">
      <OrderEmpty className="mx-auto h-52 w-52" />

      <p className="text-center">为空</p>
    </div>
  )
}
