import mongoose from 'mongoose'
import basePlugin from './base_model'

const BannerSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: false,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
BannerSchema.plugin(basePlugin)

const Banner = mongoose.models.banner || mongoose.model('banner', BannerSchema)

export default Banner
