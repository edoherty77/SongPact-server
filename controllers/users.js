const db = require('../models')

const index = (req, res) => {
  db.User.find({}, (err, foundItems) => {
    if (err) console.log('Error in items#index:', err)
    if (!foundUsers.length) {
      return res.json({ message: 'nope' })
    }
    res.json({ users: foundUsers })
  })
}

// const show = (req, res) => {
//   db.Item.findById(req.params.id, (err, foundItem) => {
//     if (err) console.log('Error in items#show:', err)

//     if (!foundItem) return res.json({ message: 'none found' })

//     res.json({ item: foundItem })
//   })
// }

const create = async (req, res) => {
  try {
    const body = req.body.body
    const user = JSON.parse(body)
    const createdUser = await db.User.create(user)
    await createdUser.save()
    await res.json({ user: createdUser })
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

// const destroy = async (req, res) => {
//   try {
//     const deletedItem = await db.Item.findByIdAndDelete(req.params.id)
//     const foundCategory = await db.Category.findOne({ items: deletedItem._id })
//     if (foundCategory) {
//       await foundCategory.items.remove(deletedItem)
//       await foundCategory.save()

//       await res.json({ post: deletedItem })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

module.exports = {
  index,
  // show,
  create,
  // update,
  // destroy,
}
