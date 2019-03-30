'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

const login = {}

login.login = async (ctx, next) => {
  const {
    userName,
    password
  } = ctx.request.body
  await User.findAll({
    where: {
      userName,
      password
    }
  })
  ctx.result = {
    token: jwt.sign({
      userName: userName,
      password: password
    }, config.secret)
  }
  return next()
}

module.exports = login