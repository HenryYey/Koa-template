/**
 * 校验鉴权中间件
 */

import koaJwt from 'koa-jwt';
import { verify } from 'jsonwebtoken';
import { secret as _secret } from '../config';

export const jwtMiddleware = koaJwt({ secret: _secret });

export default function (ctx, next) {
  // 将 token 中的数据解密后存到 ctx 中
  if (typeof ctx.request.headers.authorization === 'string') {
    const token = ctx.request.headers.authorization.slice(7);
    ctx.jwtData = verify(token, _secret);
  }
  return jwtMiddleware(ctx, next);
}
