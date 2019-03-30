'use strict'

const query = {}

query.findSomething = async (ctx, next) => {
  ctx.result = ctx.jwtData
  return next()
}

module.exports = query
