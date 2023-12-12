import { db } from '..'
import Slider from '@/models/Slider'

const getAll = async (query = {}, filter = {}, sort = {}) => {
  await db.connect()
  const result = await Slider.find(filter)
  await db.disconnect()
  return result
}

const getById = async id => {
  await db.connect()
  const result = await Slider.findById(id)
  if (!result) throw '数据不存在'
  await db.disconnect()
  return result
}

const create = async params => {
  await db.connect()
  const newSlider = new Slider(params)
  await newSlider.save()
  await db.disconnect()
}

const _delete = async id => {
  await db.connect()
  const result = await Slider.findById(id)
  if (!result) throw '数据不存在'
  await Slider.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id, params) => {
  await db.connect()
  const result = await Slider.findById(id)
  if (!result) throw '数据不存在'
  await Slider.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

export const sliderRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
