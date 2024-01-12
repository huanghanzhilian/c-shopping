import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { db, getQuery, productRepo } from '@/helpers'
import Category from '@/models/Category'

const getAllProduct = apiHandler(async req => {
  const query = getQuery(req)

  const page = query.page ? +query.page : 1
  const page_size = query.page_size ? +query.page_size : 10
  const sort = query.sort ? +query.sort : 1

  const { category, search, inStock, discount, price } = query

  //? Filters
  await db.connect()
  const currentCategory = await Category.findOne({ slug: category })
  await db.disconnect()

  const categoryFilter = currentCategory
    ? {
        category: { $in: currentCategory._id.toString() },
      }
    : {}

  const searchFilter = search
    ? {
        title: {
          $regex: search,
          $options: 'i',
        },
      }
    : {}

  const inStockFilter = inStock === 'true' ? { inStock: { $gte: 1 } } : {}

  const discountFilter = discount === 'true' ? { discount: { $gte: 1 }, inStock: { $gte: 1 } } : {}

  const priceFilter = price
    ? {
        price: {
          $gte: +price.split('-')[0],
          $lte: +price.split('-')[1],
        },
      }
    : {}

  //? Sort
  const order =
    sort === 3
      ? { price: 1 }
      : sort === 4
        ? { price: -1 }
        : sort === 2
          ? { sold: -1 }
          : sort === 1
            ? { createdAt: -1 }
            : sort === 5
              ? { rating: -1 }
              : sort === 6
                ? { discount: -1 }
                : { _id: -1 }

  const result = await productRepo.getAll(
    {
      page,
      page_size,
    },
    {
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
      ...priceFilter,
      ...searchFilter,
    },
    order
  )
  return setJson({
    data: result,
  })
})

const createProduct = apiHandler(
  async req => {
    const body = await req.json()
    await productRepo.create(body)
    return setJson({
      message: '新增商品成功',
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

export const GET = getAllProduct
export const POST = createProduct
