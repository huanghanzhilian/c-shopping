import { setJson, apiHandler } from '@/helpers/api'
import { getQuery, orderRepo } from '@/helpers'

const getOrders = apiHandler(
  async req => {
    const query = getQuery(req)
    const page = query.page ? +query.page : 1
    const page_size = query.page_size ? +query.page_size : 10
    const result = await orderRepo.getAll({
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

export const GET = getOrders
