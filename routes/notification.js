const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/:id', ctrl.notification.index)
router.get('/:id', ctrl.notification.show)
router.put('/:id', ctrl.notification.update)
router.post('/', ctrl.notification.create)
router.delete('/:id', ctrl.notification.destroy)

// exports
module.exports = router
