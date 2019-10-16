// 获取应用实例
const app = getApp()
// pages/playsDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    id:'',
    info:{},//详情页面数据
    address_list: [],//选择地址
    address_index:-1, //地址选择器的从第几个开始的下标(ps:默认从-1)
    appointment_date_list:[], //预约日期
    appointment_date_index:-1,//预约日期的从第几个开始的下标(ps:默认从-1)
  },
  onPageScroll: function (e) {
    console.log(e);//{scrollTop:99}
    if (e.scrollTop >= 210) {
      this.setData({
        isShow:true
      })
    } else{
      this.setData({
        isShow: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })
    console.log(options)
    this.getDetails();
  },
  // 地区插件
  bindRegionChange: function (e) {
    this.setData({
      address_index: e.detail.value,
    })
  },
  // 时间插件
  bindTimeChange: function (e) {
    this.setData({
      appointment_date_index: e.detail.value
    })
  },
  // 获取详情
  getDetails(){
    let params = {
      script_id:this.data.id
    }
    app.http('getScriptInfo', params)
    .then(value=>{
      if(value.code == 200){
        this.setData({
          info:value.data.info
        })
      }
    })
  //获取时间&地址
    app.http('getOptionsInfo')
    .then(res=>{
      if (res.code == 200){
        this.setData({
          address_list: res.data.storeList, //选择地址
          appointment_date_list:res.data.timelist //预约时间
        })
      }
    })
  },
  
  //返回
  back() {
    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  },
  //立即预约
  toOrder(){
    wx.navigateTo({
      url: '/pages/orderSuccess/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})