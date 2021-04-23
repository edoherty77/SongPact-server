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
  try {
    const newPact = await db.Pact.create(body)
    await newPact.save()
    const foundUsers = await db.User.find().where('_id').in(users).exec()
    // console.log('found', foundUsers)
    foundUsers.map((user) => {
      user.pacts.push(newPact)
      user.save()
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  index,
  // show,
  create,
}
