import { getQuery, reviewRepo } from '@/helpers'
const { apiHandler, setJson } = require('@/helpers/api')

const getReviews = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const query = getQuery(req)

    const page = query.page ? +query.page : 1
    const page_size = query.page_size ? +query.page_size : 5

    const result = await reviewRepo.getAll(
      {
        page,
        page_size,
      },
      {
        product: id,
        status: 2,
      }
    )

    return setJson({
      data: result,
    })
  },
  {
    isJwt: false,
  }
)

export const GET = getReviews
export const dynamic = 'force-dynamic'
