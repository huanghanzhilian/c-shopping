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
SliderSchema.post(/^find/, function (docs) {
  if (this.op === 'find') {
    docs.forEach(doc => {
      doc._id = doc._id.toString()
      doc.category_id = doc.category_id.toString()
    })
  }
  if (this.op === 'findOne' && docs) {
    docs._id = docs._id.toString()
    docs.category_id = docs.category_id.toString()
  }
})
const Slider = mongoose.models.slider || mongoose.model('slider', SliderSchema)

export default Slider
