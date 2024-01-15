import { setJson, apiHandler } from '@/helpers/api'
import { orderRepo } from '@/helpers'

const getOrder = apiHandler(async (req, { params }) => {
  const { id } = params
  const result = await orderRepo.getById(id)
  return setJson({
    data: result,
  })
})

const updateOrder = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await orderRepo.update(id, body)
    return setJson({
      message: '已经通过确认',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

export const PATCH = updateOrder
export const GET = getOrder
export const dynamic = 'force-dynamic'
