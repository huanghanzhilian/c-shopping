import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { getQuery, reviewRepo } from '@/helpers'

const getAll = apiHandler(
  async req => {
    const userRoot = req.headers.get('userRoot')
    const userId = req.headers.get('userId')
    const query = getQuery(req)

    const page = query.page ? +query.page : 1
    const page_size = query.page_size ? +query.page_size : 10

    let result

    if (userRoot === 'true') {
      result = await reviewRepo.getAll({
        page,
        page_size,
      })
    } else {
      result = await reviewRepo.getAll(
        {
          page,
          page_size,
        },
        {
          user: userId,
        }
      )
    }

    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
  }
)

const create = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const body = await req.json()
    await reviewRepo.create(userId, body)
    return setJson({
      message: '新增成功',
    })
  },
  {
    isJwt: true,
    schema: joi.object({
      product: joi.string().required(),
      title: joi.string().required(),
      rating: joi.number().required(),
      comment: joi.string().required(),
      negativePoints: joi.array(),
      positivePoints: joi.array(),
    }),
  }
)

export const GET = getAll
export const POST = create
