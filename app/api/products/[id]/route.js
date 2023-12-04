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
      message: '产品更新成功',
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

const deleteProduct = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await productRepo.delete(id)
    return setJson({
      message: '产品已成功删除',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

export const GET = getProduct
export const PUT = updateProduct
export const DELETE = deleteProduct
