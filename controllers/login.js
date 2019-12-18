/**
 * 模板语句，按实际需求修改
 */

import jwt from 'jsonwebtoken'
import config from'../config'

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

  ctx.log.info(`user: ${userName}, token: ${password}`);
  
  ctx.result = {
    token: jwt.sign({
      userName: userName,
      password: password
    }, config.secret)
  }
  return next()
}

module.exports = login