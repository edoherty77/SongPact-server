const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/all/:roomId', ctrl.chatRoom.index)
router.get('/:id', ctrl.chatRoom.show)
router.put('/:id', ctrl.chatRoom.update)
router.post('/', ctrl.chatRoom.create)
router.delete('/:id', ctrl.chatRoom.destroy)

// exports
module.exports = router
