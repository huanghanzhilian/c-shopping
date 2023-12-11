import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    discount: { type: Number, default: 0 },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sizes: [
      {
        id: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
    colors: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        hashCode: { type: String, required: true },
      },
    ],
    category: [{ type: String, required: true }],
    category_levels: {
      level_one: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
      },
      level_two: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
      },
      Level_three: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
      },
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    info: [
      {
        title: { type: String, required: true },
        value: { type: String, required: false },
      },
    ],
    specification: [
      {
        title: { type: String, required: true },
        value: { type: String, required: false },
      },
    ],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.models.product || mongoose.model('product', ProductSchema)
export default Product
