import { Product, Order } from '@/models'
import { db } from '..'

const getAll = async ({ userId, role, page, page_size }) => {
  await db.connect()
  let orders
  let ordersLength
  if (role !== 'admin') {
    orders = await Order.find({ user: userId })
      .populate('user', '-password')
      .skip((page - 1) * page_size)
      .limit(page_size)
    ordersLength = await Order.countDocuments({ user: userId })
  } else {
    orders = await Order.find()
      .populate('user', '-password')
      .skip((page - 1) * page_size)
      .limit(page_size)
    ordersLength = await Order.countDocuments()
  }
  await db.disconnect()
  return {
    orders,
    ordersLength,
    pagination: {
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < ordersLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(ordersLength / page_size),
    },
  }
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
  params.cart.forEach(item => sold(item.productID, item.quantity, item.inStock, item.sold))
  await newOrder.save()
  await db.disconnect()
}

const sold = async (_id, quantity, oldStock, oldSold) => {
  await Product.findByIdAndUpdate(
    { _id },
    {
      inStock: oldStock - quantity,
      sold: quantity + oldSold,
    }
  )
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
