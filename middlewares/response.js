/**
 * 处理结果并统一返回响应
 * 回传遵循这样的格式：{ code: 自定义code, data: any }
 * code是为了方便程序员阅读，自定义响应结果以及错误类型
 */

const { logger } = require('./logger')

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
function errorHandler (ctx, next) {
  return next().catch(err => {
    if (err.code == null) {
      ctx.log.error(err.stack)
    }
    ctx.body = {
      code: err.code || -1,
      message: err.message.trim()
    }
    return Promise.resolve()
  })
}
module.exports = {
  responseHandler,
  errorHandler
}