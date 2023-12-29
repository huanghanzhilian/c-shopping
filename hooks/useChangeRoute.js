import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function useChangeRoute() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  let query = {}
  searchParams.forEach((value, key) => {
    query[key] = value
  })

  const changeRoute = newQueries => {
    const queryParams = new URLSearchParams()
    Object.entries({ ...query, ...newQueries }).forEach(([key, value]) => {
      if (value) queryParams.set(key, value)
    })

    replace(`${pathname}?${queryParams.toString()}`, { scroll: false })
  }

  return changeRoute
}
