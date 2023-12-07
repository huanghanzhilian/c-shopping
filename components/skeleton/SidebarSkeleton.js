import { Skeleton } from 'components'

export default function SidebarSkeleton() {
  return (
    <Skeleton count={4}>
      <Skeleton.Items className="justify-between h-10 px-4 flex-center">
        <Skeleton.Item animated="background" height="h-6" width="w-40" />
        <Skeleton.Item animated="background" height="h-7" width="w-7" className="rounded-full" />
      </Skeleton.Items>
    </Skeleton>
  )
}
