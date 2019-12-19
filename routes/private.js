/**
 * 私有路由，需要校验鉴权
 */

import Router from 'koa-router';
import controllers from '../controllers';
import jwtMiddleware from '../middlewares/jwt';

const router = new Router();
router.prefix('/api');
router.use(jwtMiddleware);

router.get('/crud', controllers.crud.search);
router.post('/crud', controllers.crud.add);
router.delete('/crud', controllers.crud.delete);

export default router;