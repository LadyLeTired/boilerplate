const Sequelize = require('sequelize');
const db = require('../database.js')
const crypto = require('crypto')
const _ = require('lodash')

const DummyModel = db.define('dummies', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
})

DummyModel.prototype.correctPassword = function (candidatePassword) {
  //should return true or false if the entered password matches
  return DummyModel.encryptPassword(candidatePassword, this.salt) === this.password
}

DummyModel.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt'])
}

DummyModel.generateSalt = () => {
  //this should generate our random salt
  return crypto.randomBytes(16).toString('base64')
}

DummyModel.encryptPassword = (plainText, salt) => {
  //accepts a plain text password and a salt, and returns its hash
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
}

const setSaltAndPassword = (user) => {
  //we need to salt and hash again when the user enters their PW for the first time
  //and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = DummyModel.generateSalt()
    user.password = DummyModel.encryptPassword(user.password, user.salt)
  }
}

//HOOKS
DummyModel.beforeCreate((userInstance) => {
  setSaltAndPassword(userInstance)
})

DummyModel.beforeUpdate((userInstance) => {
  setSaltAndPassword(userInstance)
})

module.exports = DummyModel
