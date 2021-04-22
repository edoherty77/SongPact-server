const db = require('../models')

const index = (req, res) => {
  db.FriendRequest.find({}, (err, foundFriendships) => {
    if (err) console.log('Error in users#index:', err)
    if (!foundFriendships.length) {
      return res.json({ message: 'nope' })
    }
    res.json({ users: foundFriendships })
  })
}

// const show = async (req, res) => {
//   let id = req.params.id
//   let userId = JSON.stringify(id)
//   console.log(userId)
//   try {
//     const foundUser = await db.User.findOne({ _id: req.params.id })
//     if (!foundUser) return res.json({ message: 'none found' })
//     await res.json({ user: foundUser })
//   } catch (error) {
//     console.log(error)
//   }
// }

const create = async (req, res) => {
  try {
    console.log(req.body)
    const body = req.body.body
    const requestData = JSON.parse(body)
    // const requesterId = body.requesterId
    // const recipientId = body.recipientId
    // let status = body.status
    const friendRequest = await db.FriendRequest.create(requestData)
    await friendRequest.save()
    await res.json({ request: friendRequest })
  } catch (error) {
    console.log(error)
  }
}

// const update = (req, res) => {
//   db.Item.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, updatedItem) => {
//       if (err) console.log('Error in items#update:', err)

//       res.json({
//         item: updatedItem,
//         message: `${updatedItem.title} was updated successfully`,
//       })
//     },
//   )
// }

module.exports = {
  index,
  // show,
  create,
  // update,
  // destroy,
}
