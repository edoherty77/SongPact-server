const db = require('../models')

const index = async (req, res) => {
  console.log('all messages')
}

const show = async (req, res) => {
  console.log('chatroom messages')
}
const create = async (req, res) => {
  console.log('roomId', req.params.roomId)
  const body = JSON.parse(req.body.body)
  const message = body.message
  console.log('body', body)
  try {
    const createdMessage = await db.Message.create(message)
    await createdMessage.save()
    const foundChatRoom = await db.ChatRoom.findOne({ _id: req.params.roomId })
    await foundChatRoom.messages.push(createdMessage)
    await foundChatRoom.save()
    await res.json(createdMessage)
    console.log('createdMessage', createdMessage)
    console.log('foundchatroom', foundChatRoom)
  } catch (error) {
    console.log(error)
  }
}

const update = async (req, res) => {}

const destroy = async (req, res) => {}
module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}
