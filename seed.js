const db = require('./models')
const data = [
  {
    title: 'bed',
    price: 400,
    description: 'mad comfy',
    category: 'home',
    email: 'evan@gmail.com',
  },
  {
    title: 'pen',
    price: 30,
    description: 'writes well',
    category: 'home',
    email: 'steve@gmail.com',
  },
  {
    title: 'football',
    price: 10,
    description: 'real pigskin!!',
    category: 'sports',
    email: 'mike@gmail.com',
  },
]

const categories = [
  {
    title: 'Sporting',
  },
  {
    title: 'Garden',
  },
  {
    title: 'Jewelry',
  },
  {
    title: 'Tickets',
  },
  {
    title: 'Auto',
  },
  {
    title: 'Electronics',
  },
  {
    title: 'Furniture',
  },
]

db.Category.deleteMany({}, (err, deletedCategoties) => {
  db.Category.create(categories, (err, seededCategories) => {
    if (err) console.log(err)

    console.log(data, 'item created successfully')

    process.exit()
  })
})

db.Item.deleteMany({}, (err, deletedItems) => {
  db.Item.create(data, (err, seededItems) => {
    if (err) console.log(err)

    console.log(data, 'item created successfully')

    process.exit()
  })
})
