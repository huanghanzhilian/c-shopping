import { useSearchParams } from 'next/navigation'

export default function useUrlQuery() {
  const searchParams = useSearchParams()
  let query = {}
  searchParams.forEach((value, key) => {
    query[key] = value
  })

  return query
}
