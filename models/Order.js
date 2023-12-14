import mongoose from 'mongoose'
import basePlugin from './base_model'

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    address: String,
    mobile: String,
    cart: Array,
    total: Number,
    peymentId: String,
    method: String,
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: Date,
  },
  { timestamps: true }
)
OrderSchema.plugin(basePlugin)
const Order = mongoose.models.order || mongoose.model('order', OrderSchema)
export default Order
