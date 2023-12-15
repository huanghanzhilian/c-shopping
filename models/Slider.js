import mongoose from 'mongoose'
import basePlugin from './base_model'

const SliderSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
      required: true,
      // get: v => v.toString(),
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
  },
  { timestamps: true }
)
SliderSchema.plugin(basePlugin)

const Slider = mongoose.models.slider || mongoose.model('slider', SliderSchema)

export default Slider
