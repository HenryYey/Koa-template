/**
 * 使用Sequelize连接mysql
 */

import Sequelize from 'sequelize';
import { mysql } from '../config';

const sequelize = new Sequelize(
  mysql.database,
  mysql.userName,
  mysql.password,
  mysql.config
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

export default sequelize;
