import mongoose from 'mongoose'
import basePlugin from './base_model'

const DetailsSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    info: { type: [Object], required: true },
    specification: { type: [Object], required: true },
    optionsType: {
      type: String,
      default: 'none',
      enum: ['colors', 'sizes', 'none'],
    },
  },
  { timestamps: true }
)
DetailsSchema.plugin(basePlugin)

const Details = mongoose.models.details || mongoose.model('details', DetailsSchema)

export default Details
