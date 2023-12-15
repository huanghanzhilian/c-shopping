import { db } from '..'
import Slider from '@/models/Slider'

const getAll = async (query = {}, filter = {}, sort = {}) => {
  await db.connect()
  const result = await Slider.find(filter).lean().exec()
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

const getOne = async filter => {
  try {
    await db.connect()
    const result = await Slider.findOne(filter).lean().exec()
    await db.disconnect()
    return result
  } catch (error) {
    console.log(error)
    throw '无此数据Slider'
  }
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
  getOne,
  create,
  update,
  delete: _delete,
}
