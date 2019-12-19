/**
 * 模板语句，按实际需求修改
 */
import User from '../models/user';

const crud = {};

crud.search = async (ctx, next) => {
  try {
    const {
      userName
    } = ctx.request.body;
    // 先从缓存拿，拿不到再去查表
    const res = ctx.cache.getVal(userName);
    if (res) {
      ctx.result = res;
    } else {
      ctx.result = await User.findOne({
        where: {
          userName
        }
      });

      ctx.cache.setVal({
        key: `user_${userName}`, // 推荐使用md5加密作为key
        value: res
      });
      
      ctx.log.info(`set cache ${userName}`);
    }
  } catch (err) {
    ctx.log.error(JSON.stringify(err));
    throw new Error(JSON.stringify(err));
  }

  return next();
};

crud.add = async (ctx, next) => {
  try {
    const {
      userName,
      password
    } = ctx.request.body;

    ctx.result = await User.create({
      userName,
      password
    });
  } catch (err) {
    ctx.log.error(JSON.stringify(err));
    throw new Error(JSON.stringify(err));
  }

  return next();
};

crud.delete = async (ctx, next) => {
  try {
    const {
      id
    } = ctx.request.body;

     ctx.result = await User.destroy({
      where: {
        id
      }
    });
  } catch (err) {
    ctx.log.error(JSON.stringify(err));
    throw new Error(JSON.stringify(err));
  }
  return next();
};

export default crud;