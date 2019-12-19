

import { INTEGER, STRING } from 'sequelize';
import { define } from './db';

const User = define('user', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: STRING
}, {
  freezeTableName: true
});

// 若表不存在则创建
// User.sync()

export default User;