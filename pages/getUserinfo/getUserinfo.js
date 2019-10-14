// pages/getUserinfo/getUserinfo.js
const app = getApp();
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

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.globalData.code = res.code;
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
              app.globalData.userInfo.iv = res.iv;
              app.globalData.userInfo.encryptedData = (res.encryptedData);
              this.miniLogin();
              if (app.globalData.userInfo) {
                wx.switchTab({
                  url: '/pages/index/index',
                })

              }
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            }
          })
        } else {

        }
      }
    })
  },
  // 获取用户信息
  getUserInfo(res) {
    console.log(res)
    if (res) {
      wx.login({
        success(res) {
          console.log(res)
        }
      })
    }
  },
  // 登陆
  miniLogin() {
    let params = {
      code: app.globalData.code,
      iv: app.globalData.userInfo.iv,
      encryptedData: app.globalData.userInfo.encryptedData,
    }
    app.http('miniLogin', params)
      .then(value => {
        console.log(value)
        if (value.code == 200) {

        }

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