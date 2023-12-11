import { db } from '..'
import Banner from '@/models/Banner'

const getAll = async () => {
  await db.connect()
  const result = await Banner.find()
  await db.disconnect()
  return result
}

const getById = async id => {
  await db.connect()
  const result = await Banner.findById(id)
  if (!result) throw '数据不存在'
  await db.disconnect()
  return result
}

const create = async (id, params) => {
  await db.connect()
  const newBanner = new Banner({
    user: id,
    ...params,
  })
  await newBanner.save()
  await db.disconnect()
}

const _delete = async id => {
  await db.connect()
  const result = await Banner.findById(id)
  if (!result) throw '数据不存在'
  await Banner.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id, params) => {
  await db.connect()
  const result = await Banner.findById(id)
  if (!result) throw '数据不存在'
  await Banner.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

export const bannerRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
