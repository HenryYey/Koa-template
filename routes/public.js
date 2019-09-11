/**
* 公有路由，需要校验鉴权
*/
const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()
router.prefix('/api')

router.post('/login', controllers.login.login)

module.exports = router
