import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
// 引用API文件
import api from './api/index.js'
import http from './http/axios.js'

// 将API方法绑定到全局
Vue.prototype.$api = api

//定义全局变量
Vue.prototype.$http = http

Vue.config.productionTip = false
// 跳转后返回顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

new Vue({
  el: '#app',
  router
  render: h => h(App)
  })
