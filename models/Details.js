import mongoose from 'mongoose'

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

const Details = mongoose.models.details || mongoose.model('details', DetailsSchema)

export default Details
