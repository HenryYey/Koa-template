
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const staticCache = require('koa-static-cache')
const config = require('./config')
const publicRouter = require('./routes/public.js')
const privateRouter = require('./routes/private')
const { errorHandler, responseHandler } = require('./middlewares/response')
const { Logger } = require('koa-ts-logger')
const { cacheMiddleware } = require("./middlewares/cache");

const logger = new Logger({filePath: config.logPath})
const app = new Koa()
const cors = require('koa2-cors');

app.use(cors());    //解决跨域问题
// local Logger
app.use(logger.httpLogger)
app.use(logger.getLoggers)
// Error Handler
app.use(errorHandler)
//Middlewares
app.use(bodyParser)
app.use()
app.use(staticCache(config.publicDir))
// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())
// Response
app.use(responseHandler)
module.exports = app