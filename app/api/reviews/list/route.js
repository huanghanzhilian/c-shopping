import { getQuery, reviewRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

const getAll = apiHandler(
  async req => {
    const query = getQuery(req)

    const page = query.page ? +query.page : 1
    const page_size = query.page_size ? +query.page_size : 10

    const result = await reviewRepo.getAll({
      page,
      page_size,
    })

    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

export const GET = getAll
export const dynamic = 'force-dynamic'
