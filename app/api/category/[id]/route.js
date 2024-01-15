import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { categoryRepo } from '@/helpers'

const deleteCategory = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await categoryRepo.delete(id)
    return setJson({
      message: '删除成功',
    })
  },
  {
    isJwt: true,
    identity: 'root',
  }
)

const updateCategory = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await categoryRepo.update(id, body)
    return setJson({
      message: '更新成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: joi.object({
      name: joi.string().required(),
      slug: joi.string().required(),
      image: joi.string().required(),
      colors: joi.object(),
      level: joi.number().required(),
      parent: joi.string(),
    }),
  }
)

export const DELETE = deleteCategory
export const PUT = updateCategory
export const dynamic = 'force-dynamic'
