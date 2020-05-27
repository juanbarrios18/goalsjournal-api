const mongoose = require('mongoose')
require('dotenv').config()

const mongodbConnection = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/goalsjournal-api' : process.env.MONGODB_URI
mongoose
  .connect(mongodbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info(`Successfully connected to the database ${mongodbConnection}`))
  .catch(error => console.error(`An error ocurred trying to connect to de database ${mongodbConnection}`, error))

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination')
    process.exit(0)
  })
})
