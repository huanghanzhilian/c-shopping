import { db } from '../'
import Category from 'models/Category'
import Product from 'models/Product'

const getAll = async () => {
  await db.connect()
  const result = await Product.find()
  await db.disconnect()
  return result
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
  const newProducts = new Product(params)
  await newProducts.save()
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
