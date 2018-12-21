// const router = require('express').Router()
// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook')
// const { DummyModel } = require('../db/models/dummyModel')

// module.exports = router
// router.get('/', passport.authenticate('facebook', { scope: ['email'] }))

// router.get('/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/home',
//     failureRedirect: '/'
//   }))

// passport.use(
//   new FacebookStrategy({
//     //--------------REQUIRES EDITS--------------//
//     clientID: '808665369477649',
//     clientSecret: '3fe7c50a96a9de478912f752262632c0',
//     callbackURL: 'http://localhost:3000/auth/facebook/callback',
//     profileFields: ['id', 'emails', 'name', 'picture.type(large)']
//     //------------------------------------------//
//   },

//     async (token, refreshToken, profile, done) => {
//       try {
//         const otherInfo = {
//           email: profile.emails[0].value,
//           imageUrl: profile.photos ? profile.photos[0].value : undefined
//         }
//         const [userInstance, wasCreated] = await DummyModel.findOrCreate({
//           where: {
//             facebookId: profile.id
//           }
//         })
//         userInstance.email = otherInfo.email
//         userInstance.imageUrl = otherInfo.imageUrl
//         done(null, userInstance)
//       } catch (err) {
//         done(err)
//       }
//     })
// )

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })
// passport.deserializeUser(async (id, done) => {
//   try {
//     let foundUser = await DummyModel.findById(id)
//     done(null, foundUser)
//   } catch (err) {
//     done(err)
//   }
// })
