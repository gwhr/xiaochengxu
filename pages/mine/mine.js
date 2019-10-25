// pages/mine/mine.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:undefined,
    code:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code:app.globalData.code
    })
    this.getUserinfos()
  },
  //授权
  /**
  * 授权登录
  */
  shouquan: function (res2) { //获取用户信息
    var that = this;
    console.log(res2)
    if (!app.globalData.userInfo) { //判断用户信息是否存在
      app.globalData.userInfo = res2.detail.userInfo;
      that.setData({
        userInfo: res2.detail.userInfo,
      })
      //一定要把加密串转成URI编码
      var encryptedData = res2.detail.encryptedData;
      var iv = res2.detail.iv;
      wx.getSetting({ //判断用户是否已授权
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            console.log('授权')
            that.LoginTo(app.globalData.code, iv, encryptedData);
          } else { //未授权登录失败，打开设置授权窗口
            wx.showModal({
              title: '提示',
              content: '登录失败，请授权用户信息后退出重试',
              success: res => {
                if (res.confirm) {
                  wx.openSetting({
                    success(res) {
                    }
                  })
                }
              }
            })
          }
        }
      })
    } else {
      return;
    }
  },
  //登录自己服务器
  LoginTo(code, iv, encryptedData) {
    let params = {
      code: code,
      iv: iv,
      encryptedData: encryptedData,
    }
    app.http('miniLogin', params)
      .then(res => {
        if (res.code == 200) {
          console.log(res)
          wx.setStorageSync('token', res.data.userToken)
          app.globalData.userToken = res.data.userToken
          // app.globalData.userId = res.data.data.userInfo.id
          // app.globalData.userInfo = res.data.data.userInfo
          // app.globalData.userInfo = res
          this.getUserinfos()
        } else {
          wx.showToast({
            title: '登录失败，' + res.data.message,
            icon: 'none'
          })
        }

      })
  },
  getUserinfos(){
    let userToken = wx.getStorageSync('token')
    let params = {
      userToken: userToken
    }
    app.http('getUserInfo', params)
      .then(res => {
        if (res.code == 200) {
          console.log(res)
          app.globalData.userInfo = res.data
          this.setData({
            userInfo: res.data
          })
        } else {
          wx.showToast({
            title: '请登录！',
            icon: 'none'
          })
        }
      })
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