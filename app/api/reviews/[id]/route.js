import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { productRepo, reviewRepo } from '@/helpers'

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
    const review = await reviewRepo.update(id, body)
    const product = await productRepo.getById(review.product)
    const reviews = await reviewRepo.getAll(
      { page: 0, page_size: 0 },
      {
        product: product?._id,
      }
    )

    if (product && reviews.reviews.length) {
      let { totalRating, totalReviews } = reviews.reviews.reduce(
        (total, item) => {
          if (item.status === 2) {
            total.totalRating += item.rating
            total.totalReviews += 1
          }
          return total
        },
        { totalRating: 0, totalReviews: 0 }
      )
      await productRepo.update(review.product, {
        numReviews: totalReviews,
        rating: totalReviews ? totalRating / totalReviews : 0,
      })
    }

    return setJson({
      message: '更新成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
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
