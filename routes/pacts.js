const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.pacts.index)
// router.get('/:id', ctrl.categories.show)
router.put('/:id', ctrl.pacts.update)
router.post('/', ctrl.pacts.create)
router.delete('/:id', ctrl.pacts.destroy)

// exports
module.exports = router
