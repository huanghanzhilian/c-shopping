import mongoose from 'mongoose'

mongoose.Promise = global.Promise
const connection = {}

async function connect() {
  if (connection.isConnected) {
    console.log('already connected')
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1) {
      console.log('use previous connection')
      return
    }
    // await mongoose.disconnect()
  }

  try {
    await mongoose.set('strictQuery', false)
    const db = await mongoose.connect(process.env.MONGODB_URL)
    console.log('new connection')
    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log(error)
    process.exit(1)
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
