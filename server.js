const express = require('express')
const app = express()
const routes = require('./routes')
require('dotenv').config({ path: '.env' })
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const Pact = require('./models/pact')
const passport = require('passport')
const port = process.env.PORT || 4000

// let data = {
//   type: 'Producer',
//   initBy: 'EvDawg',
//   sample: true,
//   recordLabel: true,
//   labelName: 'Stagotz',
//   recordTitle: 'Shabloipz',
// }

// Pact.create(data, (err, addedPact) => {
//   if (err) console.log(err)
//   console.log(data, 'item created successfully')
// })

// middleware - JSON parsing
app.use(express.json())

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//middleware - session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/spact',
    }),
    secret: 'spact',
    resave: false, // will not resave sessions
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
)

//middleware - passport config
app.use(passport.initialize())
app.use(passport.session())

// middleware - API routes
app.use('/api/v1', routes.pacts)
app.use('/api/v1/users', routes.users)

//connection
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`),
)
