import { Skeleton } from 'components'

export default function TableSkeleton({ count = 5 }) {
  return (
    <Skeleton count={count}>
      <Skeleton.Items className="my-1.5">
        <Skeleton.Item animated="background" height="h-16" width="w-full" className="rounded-sm" />
      </Skeleton.Items>
    </Skeleton>
  )
}
