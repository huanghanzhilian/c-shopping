import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

const Category = mongoose.models.category || mongoose.model('category', CategorySchema)

export default Category
