'use strict'

const path = require('path')

module.exports = {
  port: '3000',
  secret: 'token',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  mysql: {
    database: 'user',
    userName: 'root',
    password: 'password',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
}