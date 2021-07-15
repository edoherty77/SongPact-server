const express = require('express')
const app = express()
const routes = require('./routes')
require('dotenv').config({ path: '.env' })
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const port = process.env.PORT || 4000

// middleware - JSON parsing
app.use(express.json())

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

//middleware - session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/spact',
    }),
    secret: 'spact',
    resave: false, // will not resave sessions
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
)

//middleware - passport config
app.use(passport.initialize())
app.use(passport.session())

// middleware - API routes
app.use('/api/v1/pacts', routes.pacts)
app.use('/api/v1/users', routes.users)
app.use('/api/v1/auth', routes.auth)
app.use('/api/v1/message', routes.message)
app.use('/api/v1/friendRequests', routes.friendRequests)

//connection
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`),
)
