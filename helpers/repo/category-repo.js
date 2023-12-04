import { db } from '../'
import Category from 'models/Category'
import Product from 'models/Product'

const getAll = async () => {
  await db.connect()
  const result = await Category.find()
  await db.disconnect()
  return result
}

const create = async params => {
  const { name } = params
  await db.connect()
  const category = await Category.findOne({ name })
  if (category) throw '该分类名称已存在'
  const newCategory = new Category({ name })
  await newCategory.save()
  await db.disconnect()
}

const _delete = async id => {
  await db.connect()
  const product = await Product.findOne({ category: id })
  if (product) throw '请删除与此组相关的所有产品'

  const category = await Category.findById(id)
  if (!category) throw '分类不存在'
  await Category.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id, { name }) => {
  await db.connect()
  const category = await Category.findById(id)
  if (!category) throw '分类不存在'
  await Category.findByIdAndUpdate({ _id: id }, { name })
  await db.disconnect()
}

export const categoryRepo = {
  getAll,
  create,
  update,
  delete: _delete,
}
