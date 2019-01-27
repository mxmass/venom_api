module.exports = (mongoose, config) => {
  const database = mongoose.connection
  mongoose.Promise = Promise
  mongoose.connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    promiseLibrary: global.Promise
  })
  database.on('error', error => console.log(`Connection to MyApp database failed: ${error}`))
  database.on('connected', () => console.log('Connected to MyApp database'))
  database.on('disconnected', () => console.log('Disconnected from MyApp database'))
  process.on('SIGINT', () => {
    database.close(() => {
      console.log('MyApp terminated, connection closed')
      process.exit(0)
    })
  })
}
