/**
 * 将缓存封装为中间件,使其能用于整个项目
 * https://www.npmjs.com/package/node-cache-obj
 */

import { Cache } from 'node-cache-obj'

const myCache = new Cache();

export const cacheMiddleware = async (ctx, next) => {
  ctx.cache = myCache;
  return next();
}
