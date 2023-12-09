import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { productRepo } from '@/helpers'

const getAllProduct = apiHandler(async req => {
  const result = await productRepo.getAll()
  return setJson({
    data: result,
  })
})

const createProduct = apiHandler(
  async req => {
    const body = await req.json()
    await productRepo.create(body)
    return setJson({
      message: '新增产品成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: joi.object({
      title: joi.string().required(),
      price: joi.number().required(),
      inStock: joi.number().required(),
      description: joi.string().required(),
      content: joi.string().required(),
      category: joi.string().required(),
      images: joi.array().required(),
    }),
  }
)

export const GET = getAllProduct
export const POST = createProduct
