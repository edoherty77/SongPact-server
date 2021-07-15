const db = require('../models')

const search = (req, res) => {
  const q = req.params.name
  db.User.find(
    {
      name: {
        $regex: new RegExp(q, 'i'),
      },
    },
    function (err, data) {
      res.json(data)
    },
  ).limit(10)
}

const show = async (req, res) => {
  try {
    const foundUser = await db.User.findOne({
      _id: req.params.id,
    }).populate('pacts')
    // if (!foundUser) return res.json({ message: 'none found' })
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

const update = (req, res) => {
  db.User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) console.log('Error in items#update:', err)

      res.json({
        user: updatedUser,
      })
    },
  )
}

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
  search,
  show,
  create,
  update,
  // destroy,
}
