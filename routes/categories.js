const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.categories.index)
// router.get('/:id', ctrl.categories.show)
router.post('/', ctrl.categories.create)

// exports
module.exports = router
