// pages/addSeek/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取列表数据
  getDetail(game_id, userToken = '') {
    app.http('getGameInfo', {
      game_id,
      userToken
    }).then(res => {
      console.log(res.data.info)
      this.setData({
        detailData: res.data.info
      })
    })
  },
  // 加入打野
  addToGame(e) {
    if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined) {
      wx.showToast({
        title: '请登录后重试',
        icon: 'none'
      })
      return
    } 
    let game_id = e.target.dataset.game_id
    app.http('addToGame', {
      game_id,
      userToken: wx.getStorageSync('token')
    }).then(res => {
      console.log(res)
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
    this.getDetail(1)
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