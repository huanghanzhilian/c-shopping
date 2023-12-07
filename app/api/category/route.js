import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { categoryRepo } from '@/helpers'

const getCategory = apiHandler(async req => {
  const result = await categoryRepo.getAll()
  return setJson({
    data: {
      categories: result,
    },
  })
})

const createCategory = apiHandler(
  async req => {
    const body = await req.json()
    await categoryRepo.create(body)

    return setJson({
      message: '创建分类成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: joi.object({
      name: joi.string().required(),
      slug: joi.string().required(),
      image: joi.string().required(),
      colors: joi.object().required(),
      level: joi.number().required(),
      parent: joi.string(),
    }),
  }
)

export const GET = getCategory
export const POST = createCategory
