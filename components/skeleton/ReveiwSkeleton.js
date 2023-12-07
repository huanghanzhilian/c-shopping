import { Skeleton } from 'components'

export default function ReveiwSkeleton() {
  return (
    <Skeleton count={5}>
      <Skeleton.Items className="mb-8 space-y-2">
        <Skeleton.Item animated="background" height="h-5" width="w-64" className="rounded-full" />
        <Skeleton.Item animated="background" height="h-5" width="w-20" className="rounded-md" />
        <Skeleton.Item animated="background" height="h-5" width="w-full" className="rounded-md" />
        <Skeleton.Item animated="background" height="h-5" width="w-full" className="rounded-md" />
        <Skeleton.Item animated="background" height="h-5" width="w-full" className="rounded-md" />
        <Skeleton.Item animated="background" height="h-5" width="w-1/3" className="rounded-md" />
      </Skeleton.Items>
    </Skeleton>
  )
}
