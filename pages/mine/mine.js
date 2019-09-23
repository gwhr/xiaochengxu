// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 版本信息
  showVersion(){
    wx.showToast({
      title: '当前版本为最新版本',
      icon:'none'
    })
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },
  // 跳转我的资料
  toUserInfo(){
    wx.navigateTo({
      url: '/pages/userInfo/index',
    })
  },
  // 跳转充值页面
  addCredit() {
    wx.navigateTo({
      url: '/pages/addCredit/index',
    })
  },
  //跳转消息列表
  toMessage() {
    wx.navigateTo({
      url: '/pages/messageList/index',
    })
  },
  // 跳转我的预约
  toOrder() {
    wx.navigateTo({
      url: '/pages/myOrder/index',
    })
  },
  // 跳转已创建
  toEstablished() {
    wx.navigateTo({
      url: '/pages/established/index',
    })
  },
  // 跳转已玩过
  toPlayed() {
    wx.navigateTo({
      url: '/pages/played/index',
    })
  },
  //跳转优惠卡券
  toCoupon(){
    wx.navigateTo({
      url: '/pages/coupon/index',
    })
  },
  //跳转关于我们
  toAbout(){
    wx.navigateTo({
      url: '/pages/about/index',
    })
  },
  //跳转组织地址
  toAddress() {
    wx.navigateTo({
      url: '/pages/address/index',
    })
  },
  //跳转在线客服
  toChat(){
    wx.navigateTo({
      url: '/pages/chat/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})