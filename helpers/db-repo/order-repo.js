import { db } from '..'
import Order from '@/models/Order'

const getAll = async (userId, role) => {
  await db.connect()
  let orders
  console.log('role', role)
  if (role !== 'admin') {
    orders = await Order.find({ user: userId }).populate('user', '-password')
  } else {
    orders = await Order.find().populate('user', '-password')
  }
  await db.disconnect()
  return orders
}

const getById = async id => {
  await db.connect()
  const result = await Order.findById(id)
  if (!result) throw '订单不存在'
  await db.disconnect()
  return result
}

const create = async (id, params) => {
  await db.connect()
  const newOrder = new Order({
    user: id,
    ...params,
  })
  await newOrder.save()
  await db.disconnect()
}

const _delete = async id => {
  await db.connect()
  const order = await Order.findById(id)
  if (!order) throw '订单不存在'
  await Order.findByIdAndDelete(id)
  await db.disconnect()
}

const update = async (id, params) => {
  await db.connect()
  const order = await Order.findById(id)
  if (!order) throw '订单不存在'
  await Order.findByIdAndUpdate({ _id: id }, { ...params })
  await db.disconnect()
}

export const orderRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
