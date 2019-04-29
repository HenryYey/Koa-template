'use strict'

const path = require('path')

module.exports = {
  port: '3001',
  secret: 'token',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  mysql: {
    database: 'database',
    userName: 'HenryYe',
    password: '123456',
    config: {
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      pool: {
        'maxConnections': 20, //最大和最小连接数
        'minConnections': 0,
        'maxIdleTime': 10000 //	连接最大空置时间（毫秒），超时后将释放连接
      },
      define: {
        // 字段以下划线（_）来分割（默认是驼峰命名风格）  
        'underscored': true,
        'charset': 'utf8',
        'collate': 'utf8_general_ci',
        'freezeTableName': true,
        'timestamps': true, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
      },
    }
  }
}