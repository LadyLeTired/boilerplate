// // if (process.env.NODE_ENV !== 'production') {
// //   require('./localSecrets')
// // }

// const router = require("express").Router();
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const { DummyModel } = require("../db/models/dummyModel");

// module.exports = router;

// //Google authentication and login (GET /auth/google)
// router.get("/", passport.authenticate("google", { scope: "email" }));

// //Handles the callback after Google authenticates the user (GET /auth/google/authenticate)
// router.get(
//   "/callback",
//   passport.authenticate("google", {
//     successRedirect: "/", //THIS MIGHT CHANGE!!!
//     failureRedirect: "/login"
//   })
// );

// passport.use(
//   new GoogleStrategy(
//     {
//       //--------------REQUIRES EDITS--------------//
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_ID,
//       callbackURL: "http://localhost:8000/auth/google/callback"
//       //------------------------------------------//
//     },

//     async (token, refreshToken, profile, done) => {
//       // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.

//       try {
//         const otherInfo = {
//           email: profile.emails[0].value,
//           imageUrl: profile.photos ? profile.photos[0].value : undefined
//         };
//         const [userInstance, wasCreated] = await DummyModel.findOrCreate({
//           where: {
//             googleId: profile.id
//           }
//         });
//         userInstance.email = otherInfo.email;
//         userInstance.imageUrl = otherInfo.imageUrl;
//         done(null, userInstance);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     let foundUser = await DummyModel.findById(id);
//     done(null, foundUser);
//   } catch (err) {
//     done(err);
//   }
// });
