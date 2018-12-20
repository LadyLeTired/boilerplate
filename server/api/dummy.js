const router = require('express').Router();
const DummyModel = require('../db/models/dummyModel')

module.exports = router;

//GET /api/dummy
router.get('/', async (req, res, next) => {
  try {
    const dummies = await DummyModel.findAll();
    res.json(dummies)
  } catch (err) {
    next(err)
  }
})

//GET /api/dummy/:id
router.get('/:id', async (req, res, next) => {
  try {
    const dummyId = req.params.dummyId
    const requestedDummy = await DummyModel.find({
      where: {
        id: dummyId
      }/*, include: [AssociatedTable] */
    })
    res.json(requestedDummy)
  } catch (err) { next(err); }
})

//POST /api/dummy
router.post('/', async (req, res, next) => {
  try {
    await DummyModel.create(req.body);
    res.json(req.body)
  } catch (err) { next(err); }
})

//DELETE /api/dummy/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await DummyModel.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204).end()
  } catch (err) { next(err); }
})

//PUT /apu/dummy/:id
// router.put('/:id', async (req, res, next) => {
//   try {
//     let foundDummy = await DummyModel.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     foundDummy ? /*res.json the edits*/ : /*Handle the error somehow */
//   } catch (err) { next(err); }
// })