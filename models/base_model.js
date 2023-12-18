import mongoose from 'mongoose'

const basePlugin = schema => {
  schema.set('toJSON', { getters: true, virtuals: false })
  schema.set('toObject', { getters: true })
}

export default basePlugin
