'use strict'

const { logger } = require('./logger')

// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 回传的格式遵循这样的格式：{ code: 0, data: any }
function responseHandler(ctx) {
  if (ctx.result !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: 0,
      data: ctx.result
    }
  }
}
// 这个middleware处理在其它middleware中出现的异常
// 并将异常消息回传给客户端：{ code: '错误代码', message: '错误信息' }
function errorHandler (ctx, next) {
  return next().catch(err => {
    if (err.code == null) {
      logger.error(err.stack)
    }
    ctx.body = {
      code: err.code || -1,
      message: err.message.trim()
    }
    ctx.status = 200 // 保证返回状态是 200, 这样前端不会抛出异常
    return Promise.resolve()
  })
}
module.exports = {
  responseHandler,
  errorHandler
}