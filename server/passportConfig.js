const passport = require('passport')
const bCrypt = require('bcryptjs')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: FacebookStrategy } = require('passport-facebook')

const users = [
  {
    username: 'abc@gmail.com',
    // 123456
    password: '$2a$10$V.xVUU3FBks5F/kVcRkrHO/bIU/qGQTjFevBrTf4FfuVu7uUGsOaW',
    accessToken: '',
  },
  {
    username: 'vivek.officialr@gmail.com',
    password: '',
    accessToken: '',
  },
]

passport.use(
  'local',
  new LocalStrategy(
    {
      username: 'username',
      password: 'password',
    },
    async (username, password, cb) => {
      try {
        const user = users.find((user) => user.username === username)

        if (!user) {
          cb(null, null, { message: 'Incorrect username or password' })
          return
        }

        if (!(await bCrypt.compare(password, user.password))) {
          cb(null, null, { message: 'Incorrect username or password' })
          return
        }

        cb(null, user)
      } catch (err) {
        cb(err)
      }
    }
  )
)

passport.use(
  'facebook',
  new FacebookStrategy(
    {
      clientID: '1787917724841147',
      clientSecret: '1bcc3243a3442274317f67c84b71a691',
      callbackURL: '/api/v1/auth/facebook/callback',
      profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = users.find((user) => user.accessToken === accessToken)
        if (!user) {
          done(null, null, { message: 'User not found' })
          return
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
