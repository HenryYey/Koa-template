/**
 * 私有路由，需要校验鉴权
 */

const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api')
router.use(jwtMiddleware)

router.get('/query', controllers.query.findSomething)

router.get('/crud', controllers.crud.search)
router.post('/crud', controllers.crud.add)
router.delete('/crud', controllers.crud.delete)

module.exports = router
