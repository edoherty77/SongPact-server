const db = require('../models')

const index = async (req, res) => {
  let userId = req.params.id
  try {
    const Pacts = await db.Pact.find({ 'users.user': userId })
      .populate('users collaborators performers')
      .exec()
    if (!Pacts.length)
      return res.json({
        message: 'none found',
      })
    await res.json({ pact: Pacts })
  } catch (error) {
    console.log(error)
  }
}

const show = async (req, res) => {
  console.log('req', req.params.id)
  try {
    const foundPact = await db.Pact.findOne({ _id: req.params.id })
    await res.json(foundPact)
    console.log('foundPact', foundPact)
  } catch (error) {
    console.log(error)
  }
}

const create = async (req, res) => {
  const body = JSON.parse(req.body.body)
  const users = body.users
  const collabs = body.collaborators
  const initBy = body.initBy.name
  let userIds = []
  let collabIds = []
  for (let id of collabs) {
    collabIds.push(id.user)
  }
  for (let id of users) {
    userIds.push(id.user)
  }
  try {
    const newPact = await db.Pact.create(body)
    await newPact.save()
    const foundUsers = await db.User.find().where('_id').in(userIds).exec()
    foundUsers.map(async (user) => {
      user.pacts.push(newPact)
      await user.save()
    })
    const newNotification = await db.Notification.create({
      pactId: newPact._id,
      text: `${initBy} created a contract for ${body.recordTitle}`,
    })
    await newNotification.save()
    const foundCollabs = await db.User.find().where('_id').in(collabIds).exec()
    foundCollabs.map(async (user) => {
      user.notifications.push(newNotification)
      await user.save()
    })
    await res.json({ pact: newPact })
  } catch (error) {
    console.log(error)
  }
}

const update = async (req, res) => {
  const pactId = req.body.id
  const user = req.body.user
  const status = req.body.status
  const signatureImg = req.body.signatureImg
  try {
    const updatedPact = await db.Pact.findOneAndUpdate(
      { _id: pactId, 'users.user': user },
      {
        $set: {
          'users.$.signatureImg': signatureImg,
          'users.$.userStatus': 2,
        },
      },
      { new: true },
    )
    await updatedPact.save()
    await res.json({ pact: updatedPact })
  } catch (error) {
    console.log(error)
  }
}

const destroy = async (req, res) => {
  try {
    const deletedPact = await db.Pact.findByIdAndDelete(req.params.id)
    const foundUsers = await db.User.find({ pacts: deletedPact._id })
    foundUsers.map((user) => {
      user.pacts.remove(deletedPact)
      user.save()
    })
    await res.json({ pact: deletedPact })
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
