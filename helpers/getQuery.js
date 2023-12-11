export const getQuery = req => {
  const searchParams = req.nextUrl.searchParams
  let query = {}
  searchParams.forEach((value, key) => {
    query[key] = value
  })
  return query
}
