import { Skeleton } from 'components'

export default function OrderSkeleton() {
  return (
    <Skeleton count={5}>
      <Skeleton.Items className="mb-8 space-y-2">
        <Skeleton.Item animated="background" height="h-5" width="w-64" className="rounded-full" />
        <Skeleton.Item animated="background" height="h-5" width="w-20" className="rounded-md" />
        <div className="flex gap-x-3">
          <Skeleton.Item animated="background" height="h-20" width="w-20" className="rounded-md" />
          <Skeleton.Item animated="background" height="h-20" width="w-20" className="rounded-md" />
          <Skeleton.Item animated="background" height="h-20" width="w-20" className="rounded-md" />
          <Skeleton.Item animated="background" height="h-20" width="w-20" className="rounded-md" />
        </div>
      </Skeleton.Items>
    </Skeleton>
  )
}
