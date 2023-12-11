import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { bannerRepo } from '@/helpers'

const getDetail = apiHandler(async (req, { params }) => {
  const { id } = params
  const result = await bannerRepo.getById(id)
  return setJson({
    data: result,
  })
})

const update = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await bannerRepo.update(id, body)
    return setJson({
      message: '更新成功',
    })
  },
  {
    isJwt: true,
    identity: 'root',
    schema: joi.object({
      category_id: joi.string().required(),
      image: joi.object().required(),
      isPublic: joi.boolean().required(),
      title: joi.string().required(),
      type: joi.string().required(),
      uri: joi.string().required(),
    }),
  }
)

const _delete = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await bannerRepo.delete(id)
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
export const PUT = update
export const DELETE = _delete
