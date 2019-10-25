// pages/myOrder/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getList()
  },
  getList() {
    if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined) {
      wx.showToast({
        title: '请登录后重试',
        icon: 'none'
      })
      return
    }
    let params = {
      userToken: wx.getStorageSync('token'),
      type: 2 // 1已创建(打野),2已预约
    }
    app.http('getMyGameList', params)
      .then(value => {
        if (value.code == 200) {
          console.log(value)
          value.data.list.map(item => {
            item.created_at = item.created_at.substring(0, 11)
          })
          this.setData({
            list: value.data.list
          })
        } else{
          wx.showToast({
            title: value.message,
            icon:'none'
          })
        }

      })
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