'use strict'

const Sequelize = require('sequelize')
const db = require('./db')

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: Sequelize.STRING
}, {
  freezeTableName: true
})

// 若表不存在则创建
User.sync()

module.exports = User