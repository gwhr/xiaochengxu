// pages/playsDetail/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game_id: '',
    detailData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      game_id: options.id ? options.id : ''
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
    this.detailData(this.data.game_id)
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

  },

  /**
   * 获取详情信息
   */
  detailData: function (game_id) {
    let params = {
      userToken: wx.getStorageSync('token'),
      game_id
    }
    app.http('getMyGameInfo', params).then(res => {
      console.log(res)
      let detailData = res.data.gameInfo
      detailData.start_date = app.formatTime(new Date(detailData.start_date * 1000), 2)
      this.setData({
        detailData
      })
    })
  }
})