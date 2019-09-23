let baseURL = 'http://www.dywchina.com/api/'
function http(url, data = {}, method = 'POST', header = { "accept": "*/*", "content-type": "application/json" }){
 return new Promise((resolve,reject)=>{
   wx.request({
     url:`${baseURL}${url}`,
     data,
     method,
     header,
     success:function(res){
       resolve(res.data)
     },
     fail: function (res) {
       resolve(res)
     },
   })
 })
}
export default http;