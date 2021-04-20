const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const app = express()
const port = process.env.PORT || 4000

// middleware - JSON parsing
app.use(express.json())

//middleware - cors
const corsOptions = {
  //from which urls do we want to request
  origin: ['http://localhost:3000'],
  credentials: true, // allow the session cookie to and from the client
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))

//middleware - session config
app.use(
  session({
    store: new MongoStore({
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/whatever',
    }),
    secret: 'ILikeTurtless',
    resave: false, // will not resave sessions
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
)

// middleware - API routes
app.use('/api/v1', routes.categories)
app.use('/api/v1/items', routes.items)

//connection
app.listen(port, () => console.log(`Server is running on port ${port}`))
