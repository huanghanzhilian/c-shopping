import { db } from '..'
import Review from '@/models/Review'

const getAll = async ({ page, page_size }, filter) => {
  await db.connect()
  const reviews = await Review.find(filter)
    .populate('product', 'images')
    .populate('user', 'name')
    .skip((page - 1) * page_size)
    .limit(page_size)
    .sort({
      createdAt: 'desc',
    })
  const reviewsLength = await Review.countDocuments(filter)
  await db.disconnect()
  return {
    reviews,
    reviewsLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < reviewsLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(reviewsLength / page_size),
    },
  }
}

const getById = async id => {
  await db.connect()
  const result = await Review.findById(id).populate('product', 'images').populate('user', 'name')
  if (!result) throw '数据不存在'
  await db.disconnect()
  return result
}

const create = async (id, params) => {
  await db.connect()
  const newReview = new Review({
    user: id,
    ...params,
  })
  await newReview.save()
  await db.disconnect()
}

const _delete = async id => {
  await db.connect()
  const result = await Review.findById(id)
  if (!result) throw '数据不存在'
  await Review.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id, params) => {
  await db.connect()
  const result = await Review.findById(id)
  if (!result) throw '数据不存在'
  await Review.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
  return result
}

export const reviewRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
