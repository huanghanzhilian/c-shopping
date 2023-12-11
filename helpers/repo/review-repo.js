import { db } from '..'
import Review from '@/models/Review'

const getAll = async () => {
  await db.connect()
  const result = await Review.find()
  await db.disconnect()
  return result
}

const getById = async id => {
  await db.connect()
  const result = await Review.findById(id)
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
}

export const reviewRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
