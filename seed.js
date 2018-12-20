const { db } = require('./server/db')
const DummyModel = require('./server/db/models/dummyModel')

const seed = async () => {
  try {
    await db.sync({ force: true })
    await DummyModel.create({
      name: 'Test Dummy',
      email: 'test@dummy.com',
      password: 'hi',
      imageUrl: 'http://3.bp.blogspot.com/--7gtJQo5mHE/UGMKHZapqmI/AAAAAAAAWGU/5X26Pgj_St4/s1600/funny-cat-pictures-017-005.jpg'
    })
    console.log(`
      Seed success!
    `)
    db.close()
  } catch (err) {
    console.error(`
      Oh noes!
    `)
    console.error(err.stack)
    db.close()
  }
}

seed()
