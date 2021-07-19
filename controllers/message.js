const db = require('../models')

const index = async (req, res) => {
  console.log('all messages')
}

const show = async (req, res) => {
  console.log('chatroom messages')
}
const create = async (req, res) => {}

const update = async (req, res) => {}

const destroy = async (req, res) => {}
module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}
