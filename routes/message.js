const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.message.index)
router.get('/:id', ctrl.message.show)
router.put('/roomId/:id', ctrl.message.update)
router.post('/:roomId', ctrl.message.create)
router.delete('/:roomId/:id', ctrl.message.destroy)

// exports
module.exports = router
