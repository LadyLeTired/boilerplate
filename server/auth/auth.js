const router = require("express").Router();
const DummyModel = require("../db/models/dummyModel");
module.exports = router;

// router.use('/google', require('./oauth-google'))
// router.use('/facebook', require('./oauth-fb'))

const userNotFound = next => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
};

router.get("/me", (req, res, next) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      userNotFound(next);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/login", async (req, res, next) => {
  try {
    let foundUser = await DummyModel.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!foundUser) {
      res.status(401).send("User not found!");
    } else if (!foundUser.correctPassword(req.body.password)) {
      res.status(401).send("Incorrect password!");
    } else {
      req.login(foundUser, err => {
        err ? next(err) : res.json(foundUser);
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy(err => {
    if (err) return next(err);
    res.status(204).end();
  });
});

router.post("/signup", async (req, res, next) => {
  try {
    const createdUser = await DummyModel.create({
      email: req.body.email,
      password: req.body.password,
      imageUrl: req.body.imageUrl
    });

    res.status(201);
    res.json(createdUser);
  } catch (err) {
    next(err);
  }
});
