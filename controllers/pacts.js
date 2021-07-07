const db = require('../models')

const index = async (req, res) => {
  try {
    const Pact = await db.Pact.find({})
    // const Pact = await db.Category.find({}).populate('items')
    console.log('Patc', Pact)
    if (!Pact.length)
      return res.json({
        message: 'none found',
      })

    await res.json({ pact: Pact })
  } catch (error) {
    console.log(error)
  }
}

// const show = (req, res) => {
//   db.Category.findById(req.params.id, (err, foundCategory) => {
//     if (err) console.log('Error in categories#show:', err)

//     if (!foundCategory) return res.json({ message: 'none found' })

//     res.json({ item: foundCategory })
//   })
// }

const create = async (req, res) => {
  const body = JSON.parse(req.body.body)
  const users = body.users
  let userIds = []
  for (let id of users) {
    userIds.push(id.user)
  }
  console.log('users', userIds)
  try {
    const newPact = await db.Pact.create(body)
    await newPact.save()
    const foundUsers = await db.User.find().where('_id').in(userIds).exec()
    console.log('foundUsers', foundUsers)
    foundUsers.map(async (user) => {
      user.pacts.push(newPact)
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
    // }
    // const updatedPact = await db.Pact.findOneAndUpdate(
    //   { _id: pactId, 'collaborators.user': user },
    //   {
    //     $set: {
    //       'collaborators.$.status': status,
    //       'collaborators.$.signatureImg': signatureImg,
    //     },
    //   },
    //   { new: true },
    // )
    // await updatedPact.save()
    // await res.json({ pact: updatedPact })
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
  // show,
  create,
  update,
  destroy,
}
