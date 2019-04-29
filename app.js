
'use strict'
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const staticCache = require('koa-static-cache')
const config = require('./config')
const publicRouter = require('./routes/public.js')
const privateRouter = require('./routes/private')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandler, responseHandler } = require('./middlewares/response')

const app = new Koa()
var cors = require('koa2-cors');
app.use(cors());    //解决跨域问题
// Logger
app.use(loggerMiddleware)
// Error Handler
app.use(errorHandler)
//Middlewares
app.use(bodyParser)
app.use(staticCache(config.publicDir))
// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())
// Response
app.use(responseHandler)
module.exports = app