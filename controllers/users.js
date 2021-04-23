const db = require('../models')

const index = (req, res) => {
  db.User.find({}, (err, foundUsers) => {
    if (err) console.log('Error in users#index:', err)
    if (!foundUsers.length) {
      return res.json({ message: 'nope' })
    }
    res.json({ users: foundUsers })
  })
}

const show = async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ _id: req.params.id }).populate(
      'pacts',
    )
    if (!foundUser) return res.json({ message: 'none found' })
    await res.json({ user: foundUser })
  } catch (error) {
    console.log(error)
  }
}

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
  show,
  create,
  // update,
  // destroy,
}
