import mongoose from 'mongoose'
import basePlugin from './base_model'

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    title: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    comment: { type: String, required: true },
    status: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    positivePoints: [
      {
        id: String,
        title: String,
      },
    ],
    negativePoints: [
      {
        id: String,
        title: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

ReviewSchema.plugin(basePlugin)
const Review = mongoose.models.review || mongoose.model('review', ReviewSchema)

export default Review
