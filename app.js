
import Koa from 'koa';
import staticCache from 'koa-static-cache';
import { logPath, publicDir } from './config';
import { routes, allowedMethods } from './routes/public.js';
import { routes as _routes, allowedMethods as _allowedMethods } from './routes/private';
import { errorHandler, responseHandler } from './middlewares/response';
import { Logger } from 'koa-ts-logger';
import { cacheMiddleware } from "./middlewares/cache";
import cors from 'koa2-cors';

const bodyParser = require('koa-bodyparser')();
const logger = new Logger({filePath: logPath});
const app = new Koa();

app.use(cors());    //解决跨域问题
// local Logger
app.use(logger.httpLogger);
app.use(logger.getLoggers);
// Error Handler
app.use(errorHandler);
/* 
* Middlewares
* 预期后期封装一个中间件包装器
*/
app.use(bodyParser);
app.use(cacheMiddleware);
app.use(staticCache(publicDir));
// Routes
app.use(routes(), allowedMethods());
app.use(_routes(), _allowedMethods());
// Response
app.use(responseHandler);

export default app;