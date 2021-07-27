const db = require('../models')

const index = (req, res) => {
  db.FriendRequest.find(
    { recipient: req.params.id },
    (err, foundFriendRequests) => {
      if (err) console.log('Error in requests#index:', err)
      if (!foundFriendRequests.length) {
        return res.json({ message: 'nope' })
      }
      res.json({ friendRequests: foundFriendRequests })
    },
  )
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
    const body = req.body.body
    const requestData = JSON.parse(body)
    const friendRequest = await db.FriendRequest.create(requestData)
    await friendRequest.save()
    await res.json({ request: friendRequest })
  } catch (error) {
    console.log(error)
  }
}

const update = async (req, res) => {
  const status = req.body.status
  const rqstr = req.body.requester
  const rcpient = req.body.recipient
  const friendRequestId = req.body.friendRequestId
  try {
    const updatedRequest = await db.FriendRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    if (!updatedRequest)
      return await res.json({
        message: 'No post with that ID',
      })

    if (status === 2) {
      const requester = await db.User.findOne({ _id: rqstr })
      const recipient = await db.User.findOne({ _id: rcpient })
      requester.friends.push(rcpient)
      recipient.friends.push(rqstr)
      await requester.save()
      await recipient.save()
      // await db.FriendRequest.findByIdAndDelete(friendRequestId)
    }
    await updatedRequest.save()
    await res.json({ request: updatedRequest })
  } catch (error) {
    console.log(error)
  }
}

const destroy = async (req, res) => {
  try {
    const deletedRequest = await db.FriendRequest.findByIdAndDelete(
      req.params.id,
    )
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
