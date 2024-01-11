import { db } from '..'
import Category from 'models/Category'
import Product from 'models/Product'

const getAll = async ({ page, page_size }, filter = {}, sort = {}) => {
  await db.connect()
  const products = await Product.find(filter)
    .select(
      '-description -info -specification -category -category_levels -sizes  -reviews -numReviews'
    )
    .skip((page - 1) * page_size)
    .limit(page_size)
    .sort(sort)
  const productsLength = await Product.countDocuments(filter)

  const mainMaxPrice = Math.max(
    ...(await Product.find({
      ...filter.categoryFilter,
      inStock: { $gte: 1 },
    }).distinct('price'))
  )
  const mainMinPrice = Math.min(
    ...(await Product.find({
      ...filter.categoryFilter,
      inStock: { $gte: 1 },
    }).distinct('price'))
  )

  await db.disconnect()
  return {
    mainMaxPrice,
    mainMinPrice,
    products,
    productsLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < productsLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(productsLength / page_size),
    },
  }
}

const getById = async id => {
  await db.connect()
  const result = await Product.findById(id)
  if (!result) throw '产品不存在'
  await db.disconnect()
  return result
}

const create = async params => {
  await db.connect()
  const newProduct = new Product(params)
  const mainCategory = await Category.findOne({
    parent: undefined,
  })

  if (mainCategory) newProduct.category.unshift(mainCategory?._id)
  await newProduct.save()
  await db.disconnect()
}

const _delete = async id => {
  await db.connect()
  const product = await Product.findById(id)
  if (!product) throw '产品不存在'
  await Product.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id, params) => {
  await db.connect()
  const product = await Product.findById(id)
  if (!product) throw '产品不存在'
  await Product.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

export const productRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
