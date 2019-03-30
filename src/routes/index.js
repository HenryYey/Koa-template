import Vue from "vue";
import VueRouter from "vue-router";

//前端路由
Vue.use(VueRouter);

const routes = [{
  path: "/",
  component: (resolve) => require(['../views/index.vue'], resolve),
  name: "content",
  redirect: '/index',
}]
const router = new VueRouter({
  routes
})
export default router;