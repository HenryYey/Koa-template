/**
 * 处理结果并统一返回响应
 * 回传遵循这样的格式：{ code: 自定义code, data: any }
 * code是为了方便程序员阅读，自定义响应结果以及错误类型
 */

class CodedError extends Error {
  constructor (message = '未知错误', code = -1) {
    super(message);
  
    this.code = code;
  }
}
// error response
export const AuthenticationError =  class AuthenticationError extends CodedError {
  constructor (message = 'token 校验失败') {
    super(message, 4);
  }
};

// success response
export const responseHandler = (ctx) => {
  if (ctx.result !== undefined) {
    ctx.type = 'json';
    ctx.body = {
      code: 0,
      data: ctx.result
    };

    ctx.log.info(JSON.stringify(ctx.body));
  }
};

// 这个middleware处理在其它middleware中出现的异常
export const errorHandler = (ctx, next) => {
  return next().catch(err => {
    if (err.code == null) {
      ctx.log.error(err.stack);
    }
  
    ctx.body = {
      code: err.code || -1,
      message: err.message.trim() || JSON.stringify(err)
    };

    return Promise.resolve();
  });
};