import { Skeleton } from 'components'

export default function NavbarSkeleton() {
  return (
    <Skeleton count={4}>
      <Skeleton.Items className="justify-between h-16 px-4 flex-center">
        <Skeleton.Item height="h-7" width="w-7" animated="background" className="rounded-full" />
        <Skeleton.Item height="h-5" width="w-32" animated="background" />
      </Skeleton.Items>
    </Skeleton>
  )
}
