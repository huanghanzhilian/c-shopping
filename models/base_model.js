import mongoose from 'mongoose'

const basePlugin = schema => {
  schema.set('toJSON', { getters: true, virtuals: false })
  schema.set('toObject', { getters: true })
  schema.post(/^find/, function (docs) {
    if (this.op === 'find') {
      docs.forEach(doc => {
        Object.keys(doc).forEach(key => {
          if (mongoose.Types.ObjectId.isValid(doc[key])) {
            doc[key] = doc[key].toString()
          }
        })
      })
    }
    if (this.op === 'findOne') {
      Object.keys(docs).forEach(key => {
        if (mongoose.Types.ObjectId.isValid(docs[key])) {
          docs[key] = docs[key].toString()
        }
      })
    }
  })
}

export default basePlugin
