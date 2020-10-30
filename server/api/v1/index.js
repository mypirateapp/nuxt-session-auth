const express = require('express')
const sessions = require('./resources/sessions')

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({
    success: true,
    runtime: process.env.NODE_ENV,
    version: '1',
    author: {
      name: 'UnlimitedBytes',
      email: 'admin@unlimitedbytes.ovh',
    },
    owner: {
      name: process.env.OWNER_NAME,
      email: process.env.OWNER_MAIL,
    },
  })
})

router.use('/sessions', sessions)

module.exports = router
