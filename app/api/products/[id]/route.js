import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { productRepo } from '@/helpers'

const getProduct = apiHandler(async (req, { params }) => {
  const { id } = params
  const result = await productRepo.getById(id)
  return setJson({
    data: result,
  })
})

const updateProduct = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await productRepo.update(id, body)
    return setJson({
      message: '商品更新成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: joi.object({
      title: joi.string().required(),
      price: joi.number().required(),
      category: joi.array().required(),
      images: joi.array().required(),
      info: joi.array().required(),
      specification: joi.array().required(),
      inStock: joi.number(),
      description: joi.string().allow(''),
      discount: joi.number(),
      sizes: joi.array(),
      colors: joi.array(),
      category_levels: joi.object(),
    }),
  }
)

const deleteProduct = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await productRepo.delete(id)
    return setJson({
      message: '商品已成功删除',
    })
  },
  {
    isJwt: true,
    identity: 'root',
  }
)

export const GET = getProduct
export const PUT = updateProduct
export const DELETE = deleteProduct
export const dynamic = 'force-dynamic'
