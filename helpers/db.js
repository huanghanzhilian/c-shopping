import mongoose, { connection } from 'mongoose'

async function connect() {
  console.log('process.env.MONGODB_URL', process.env.MONGODB_URL)
  if (!connection.readyState) {
    mongoose.set('strictQuery', false)
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 1000 * 60 * 110,
      })
      console.log('Mongo Connected: ')
      console.log('Mongo Connected: process.env.MONGODB_URL', process.env.MONGODB_URL)
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message)
    }
  }
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      // await mongoose.disconnect()
      // connection.isConnected = false
      // console.log('had disconnected')
    } else {
      console.log('not disconnected')
    }
  }
}

export const db = { connect, disconnect }
