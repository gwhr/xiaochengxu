let baseURL = 'https://www.dywchina.com/api/'
function http(url, data = {}, method = 'POST', header = { "accept": "*/*", "content-type": "application/json" }){
 return new Promise((resolve,reject)=>{
   wx.showLoading({
     title: '加载中',
   })
   wx.request({
     url:`${baseURL}${url}`,
     data,
     method,
     header,
     success:function(res){
       resolve(res.data)
       wx.hideLoading()
     },
     fail: function (res) {
       wx.hideLoading()
       resolve(res)
     },
   })
 })
}
export default http;