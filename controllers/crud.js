'use strict'

const User = require('../models/user')

const crud = {}

crud.search = async (ctx, next) => {
  try {
    ctx.result = await User.findAll()
  } catch(err) {
    ctx.log.error(JSON.stringify(err))
    throw new Error(JSON.stringify(err))
  }

  return next()
}

crud.add = async (ctx, next) => {
  try {
    const { userName, password } = ctx.request.body
    ctx.result = await User.create({ userName, password })
  } catch(err) {
    ctx.log.error(JSON.stringify(err))
    throw new Error(JSON.stringify(err))
  }
  return next()
}

crud.delete = async (ctx, next) => {
  try {
    const { id } = ctx.request.body
    let result = await User.destroy({ where: { id } })
  } catch(err) {
    ctx.log.error(JSON.stringify(err))
    throw new Error(JSON.stringify(err))
  }
  return next()
}

module.exports = crud
