'use strict'

const User = require('../models/user')

const crud = {}

crud.search = async (ctx, next) => {
  ctx.result = await User.findAll()
  return next()
}

crud.add = async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.result = await User.create({ userName, password })
  return next()
}

crud.delete = async (ctx, next) => {
  const { id } = ctx.request.body
  let result = await User.destroy({ where: { id } })
  return next()
}

module.exports = crud
