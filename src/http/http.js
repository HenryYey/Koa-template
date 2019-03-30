import axios from 'axios'
let qs = require('querystring')
import helper from './helper'

//console.log( process.env.NODE_ENV)

let root = process.env.NODE_ENV === 'development'
  // 开发环境api接口
  ?
  `http://localhost:3001/api`
  // 生产环境api接口
  :
  `http://0.0.0.0:3001/api`;
// 引用axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'number') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
// 根据name获取地址栏的参数值
function getQueryString(name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  let hash = window.location.hash
  let search = hash.split('?')
  let r = search[1] && search[1].match(reg)
  if (r != null) 
    return r[2];
  return ''
}
// 拼接参数至url
function queryString(url, query) {
  let str = []
  for (let key in query) {
    str.push(key + '=' + query[key])
  }
  let paramStr = str.join('&')
  return paramStr ? `${url}?${paramStr}` : url
}

function apiAxios(method, url, params, token) {
  if (params) {
    params = filterNull(params)
  }
  return axios({
    method: method,
    url: method === 'GET' || method === 'DELETE' ? queryString(url, params) : url,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    baseURL: root,
    timeout: 10000,
    headers: {
      Authorization: `Bearer${token}`
    },
    withCredentials: false
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, token) {
    return apiAxios('GET', url, params, token)
  },
  post: function (url, params, token) {
    return apiAxios('POST', url, params, token)
  },
  put: function (url, params, token) {
    return apiAxios('POST', url, params, token)
  },
  delete: function (url, params, token) {
    return apiAxios('POST', url, params, token)
  },
}