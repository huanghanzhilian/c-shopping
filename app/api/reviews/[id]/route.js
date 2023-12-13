import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { reviewRepo } from '@/helpers'

const getDetail = apiHandler(async (req, { params }) => {
  const { id } = params
  const result = await reviewRepo.getById(id)
  return setJson({
    data: result,
  })
})

const update = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await reviewRepo.update(id, body)
    return setJson({
      message: '更新成功',
    })
  },
  {
    isJwt: true,
    identity: 'root',
    schema: joi.object({
      status: joi.number().required(),
    }),
  }
)

const _delete = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await reviewRepo.delete(id)
    return setJson({
      message: '删除成功',
    })
  },
  {
    isJwt: true,
    identity: 'root',
  }
)

export const GET = getDetail
export const PATCH = update
export const DELETE = _delete