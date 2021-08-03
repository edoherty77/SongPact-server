const db = require('../models')

const index = async (req, res) => {
  let userId = req.params.id
}

const show = async (req, res) => {}

const create = async (req, res) => {}

const update = async (req, res) => {}

const destroy = async (req, res) => {
  const notificationId = req.params.id
  const userId = req.body.userId
  try {
    const foundUser = await db.User.findOne({ _id: userId })
    foundUser.notifications.remove(notificationId)
    foundUser.save()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}
