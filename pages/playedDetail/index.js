//index.js
//获取应用实例
const app = getApp()
// pages/playedDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    info:{},
    id:'',
    from:''
  },
  onPageScroll: function (e) {
    if (e.scrollTop >= 210) {
      this.setData({
        isShow: true
      })
    } else {
      this.setData({
        isShow: false
      })
    }
  },
  toSeck() {
    wx.navigateTo({
      url: '/pages/createSeek/index',
    })
  },
  // 预约
  toAppointment(){
    if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined) {
      wx.showToast({
        title: '请登录后重试',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/playsDetail/index?id=${this.data.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.from){
      this.setData({
        from: options.from
      })
    }
    this.setData({
      id: options.id
    })
    this.getDetails();
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
  // 获取详情
  getDetails() {
    let params = {
      script_id: this.data.id
    }
    app.http('getScriptInfo', params)
      .then(value => {
        if (value.code == 200) {
          this.setData({
            info: value.data.info
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