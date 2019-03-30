'use strict'

const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const jwtMiddleware = koaJwt({ secret: config.secret })
class CodedError extends Error {
  constructor (message = '未知错误', code = -1) {
    super(message)
    this.code = code
  }
}
let AuthenticationError =  class AuthenticationError extends CodedError {
  constructor (message = 'token 校验失败') {
    super(message, 4)
  }
}

module.exports = function (ctx, next) {
  // 将 token 中的数据解密后存到 ctx 中
  if (typeof ctx.request.headers.authorization === 'string') {
    const token = ctx.request.headers.authorization.slice(7)
    ctx.jwtData = jwt.verify(token, config.secret)
  }
  return next()
}
