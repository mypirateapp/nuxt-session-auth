const express = require('express')
const passport = require('passport')
const v1 = require('./v1')

const router = express.Router()

router.post(
  '/v1/auth/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
)

router.get(
  '/v1/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
)

router.use('/v1', v1)

router.use((_req, res, _next) => {
  res.status(404).json({
    success: false,
    message:
      'Either there is no API method associated with the URL path of the request, or the request refers to' +
      ' one or more resources that were not found.',
  })
})

router.use((err, _req, res, _next) => {
  console.error(err)

  res.status(500).json({
    success: false,
    message:
      'The server encountered an internal error. Please try again using truncated exponential backoff.',
  })
})

module.exports = router
