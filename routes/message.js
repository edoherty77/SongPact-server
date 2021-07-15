const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.message.index)
router.get('/:id', ctrl.message.show)
router.put('/:id', ctrl.message.update)
router.post('/', ctrl.message.create)
router.delete('/:id', ctrl.message.destroy)

// exports
module.exports = router
