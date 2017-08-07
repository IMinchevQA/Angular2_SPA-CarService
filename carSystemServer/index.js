const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
const authRoutes = require('./routes/auth')
const carsRoutes = require('./routes/cars')
const ownersRoutes = require('./routes/owners')
const usersRoutes = require('./routes/users')

const app = express()

const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(cors())

passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// routes
app.use('/auth', authRoutes)
app.use('/cars', carsRoutes)
app.use('/owners', ownersRoutes)
app.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}...`)
})
