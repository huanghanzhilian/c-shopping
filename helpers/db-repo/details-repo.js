import { db } from '..'
import Details from 'models/Details'

const getAll = async () => {
  await db.connect()
  const result = await Details.find()
  await db.disconnect()
  return result
}

const getById = async id => {
  await db.connect()
  const result = await Details.findOne({
    category_id: id,
  })
  // if (!result) throw '类别规格不存在'
  await db.disconnect()
  return result
}

const create = async params => {
  await db.connect()
  const newDetailss = new Details(params)
  await newDetailss.save()
  await db.disconnect()
}

const _delete = async id => {
  await db.connect()
  const details = await Details.findById(id)
  if (!details) throw '类别规格不存在'
  await Details.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id, params) => {
  await db.connect()
  const details = await Details.findById(id)
  if (!details) throw '类别规格不存在'
  await Details.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

export const detailsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
