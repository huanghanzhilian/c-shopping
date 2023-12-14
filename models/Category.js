import mongoose from 'mongoose'
import basePlugin from './base_model'

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
    },
    image: {
      type: String,
      required: true,
    },
    colors: { type: Object },
    level: { type: Number, required: true },
    children: { type: Array },
  },
  { timestamps: true }
)
CategorySchema.plugin(basePlugin)
const Category = mongoose.models.category || mongoose.model('category', CategorySchema)

export default Category
