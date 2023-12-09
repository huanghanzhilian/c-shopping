import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { detailsRepo } from '@/helpers'

const getDetails = apiHandler(async (req, { params }) => {
  const { id } = params
  const result = await detailsRepo.getById(id)
  return setJson({
    data: result,
  })
})

const updateDetails = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await detailsRepo.update(id, body)
    return setJson({
      message: '产品更新成功',
    })
  },
  {
    isJwt: true,
    identity: 'root',
    schema: joi.object({
      category_id: joi.string().required(),
      info: joi.array().required(),
      optionsType: joi.string().required(),
      specification: joi.array().required(),
    }),
  }
)

const deleteDetails = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await detailsRepo.delete(id)
    return setJson({
      message: '产品已成功删除',
    })
  },
  {
    isJwt: true,
    identity: 'root',
  }
)

export const GET = getDetails
export const PUT = updateDetails
export const DELETE = deleteDetails
