'use strict'
const { db } = require('./server/db')
const app = require('./server')
const PORT = process.env.PORT || 8000
// const Dummy = require('./server/db/models/dummyModel')

const init = async () => {
  // await Dummy.sync({ force: false })
  await db.sync({ force: false })
  console.log('database did the thing')
  app.listen(PORT, () => console.log(`app is currently doing the thing on Port ${PORT}`))
}

init();
