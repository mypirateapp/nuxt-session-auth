const express = require('express')
const passport = require('passport')

const router = express.Router()

router.all('/', (req, res, next) => {
  switch (req.method.toUpperCase()) {
    case 'POST':
      if (req.isAuthenticated()) {
        res.status(403).json({
          success: false,
          message: 'Forbidden',
        })
        return
      }

      passport.authenticate('local', {}, (err, user, info) => {
        if (err) {
          next(err)
          return
        }

        if (!user) {
          res.status(400).json({
            success: false,
            message: info.message,
          })
          return
        }

        req.logIn(user, (err) => {
          if (err) {
            next(err)
            return
          }

          res.json({
            success: true,
            user: {
              username: user.username,
              email: user.email,
            },
          })
        })
      })(req, res, next)
      break

    default:
      res
        .status(405)
        .append({
          Allow: 'POST',
        })
        .json({
          success: false,
          message: 'Method not allowed',
        })
      break
  }
})

router.all('/:id', (req, res) => {
  switch (req.method.toUpperCase()) {
    case 'GET':
      if (req.params.id !== '@me') {
        res.status(403).json({
          success: false,
          message: 'Forbidden',
        })
        return
      }

      if (!req.isAuthenticated()) {
        res.status(403).json({
          success: false,
          message: 'Forbidden',
        })
        return
      }

      res.json({
        success: true,
        user: {
          username: req.user.username,
          email: req.user.email,
        },
      })
      break
    case 'DELETE':
      if (req.params.id !== '@me') {
        res.status(403).json({
          success: false,
          message: 'Forbidden',
        })
        return
      }

      req.logOut()
      res.json({
        success: true,
      })
      break
    default:
      res
        .status(405)
        .append({
          Allow: 'GET, DELETE',
        })
        .json({
          success: false,
          message: 'Method not allowed',
        })
      break
  }
})

module.exports = router
