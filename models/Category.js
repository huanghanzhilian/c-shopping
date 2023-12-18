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
CategorySchema.post(/^find/, function (docs) {
  if (this.op === 'find') {
    docs.forEach(doc => {
      doc._id = doc._id.toString()
      doc.parent = doc.parent ? doc.parent.toString() : doc.parent
    })
  }
  if (this.op === 'findOne' && docs) {
    docs._id = docs._id.toString()
    docs.parent = docs.parent ? docs.parent.toString() : docs.parent
  }
})

const Category = mongoose.models.category || mongoose.model('category', CategorySchema)

export default Category
