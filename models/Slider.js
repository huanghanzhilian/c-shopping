import mongoose from 'mongoose'

const SliderSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
)

const Slider = mongoose.models.slider || mongoose.model('slider', SliderSchema)

export default Slider
