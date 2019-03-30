'use strict'

const Sequelize = require('sequelize')
const { mysql: config } = require('../config')
const { logger } = require('../middlewares/logger')

const sequelize = new Sequelize(config)

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.')
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
