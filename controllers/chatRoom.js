const db = require('../models')

const index = async (req, res) => {
  console.log('all messages')
}

const show = async (req, res) => {
  console.log('chatroom messages')
}

const create = async (req, res) => {
  const body = JSON.parse(req.body.body)
  const members = body
  // console.log('mems', members)
  try {
    const newChatRoom = await db.ChatRoom.create(members)
    await newChatRoom.save()
    await res.json({ newChatRoom: newChatRoom })
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
