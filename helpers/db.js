import mongoose, { connection } from 'mongoose'

async function connect() {
  if (!connection.readyState) {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(c => {
        console.log('Mongo Connected: ')
      })
      .catch(error => {
        console.log('error: ', error)
      })
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
