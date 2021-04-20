const db = require('../models')
const { Category } = require('../models')

const index = async (req, res) => {
  try {
    const Category = await db.Category.find({}).populate('items')

    if (!Category.length)
      return res.json({
        message: 'none found',
      })

    await res.json({ category: Category })
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

const create = (req, res) => {
  db.Category.create(req.body, (err, savedCategory) => {
    if (err) console.log('Error in category#create:', err)
    res.json({ item: savedCategory })
  })
}

module.exports = {
  index,
  // show,
  create,
}
