import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { bannerRepo } from '@/helpers'

const getAll = apiHandler(
  async req => {
    const result = await bannerRepo.getAll()
    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

const create = apiHandler(
  async req => {
    const body = await req.json()
    await bannerRepo.create(body)
    return setJson({
      message: '新增成功',
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

export const GET = getAll
export const POST = create
