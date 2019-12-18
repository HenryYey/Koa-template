/**
 * 校验鉴权中间件
 */

import koaJwt from 'koa-jwt'
import { verify } from 'jsonwebtoken'
import { secret as _secret } from '../config'

const jwtMiddleware = koaJwt({ secret: _secret })
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

export default function (ctx, next) {
  // 将 token 中的数据解密后存到 ctx 中
  if (typeof ctx.request.headers.authorization === 'string') {
    const token = ctx.request.headers.authorization.slice(7)
    ctx.jwtData = verify(token, _secret)
  }
  return next()
}
