const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.pacts.index)
// router.get('/:id', ctrl.categories.show)
router.post('/', ctrl.pacts.create)

// exports
module.exports = router
