import http from '../http/http.js'
export default  {
  login: function(data, token){
    return http.post("/",data, token)
  },
}