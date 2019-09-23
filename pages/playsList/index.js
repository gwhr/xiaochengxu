// pages/playsList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs:0,
    navList:['全部','独家','城限','盒装','预售'],
    path:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      path: options.path
    })
  },
  //搜索剧本
  searchPlays(e){
    if(e.detail.value != ''){
      wx.navigateTo({
        url: '/pages/playsDetail/index',
      })
    }
  },
  //剧本详情
  toDetail(){
    if (this.data.path == '' || this.data.path == null) {
      wx.navigateTo({
        url: '/pages/playsDetail/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/'+ this.data.path + '/index',
      })
    }
    
  },
  // 导航栏
  chooseNav(e) {
    this.setData({
      indexs: e.currentTarget.id
    })
  },
  // 跳转筛分类选页
  totypeList(){
    wx.navigateTo({
      url: '/pages/typeItem/index',
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