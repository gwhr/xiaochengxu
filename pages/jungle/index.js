// pages/jungle/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //下拉的判断
    pullShow: true,
    paddingTop:34,
    showList:false,
    listData: [], // 打野列表
  },
  showList(){
    this.setData({
      showList:true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 初始化towerSwiper 传已有的数组名即可
    this.getList();
  },
  //创建打野
  toCreate(){
    wx.navigateTo({
      url: '/pages/playsList/index?path=playedDetail',
    })
  },
  // 打野列表
  // 获取列表数据
  getList(pageNumber = 1, pageSize = 6) {
    app.http('getGameList', {
      pageNumber,
      pageSize
    }).then(res => {
      // this.listData = res.data.list
      this.setData({
        listData: res.data.list
      })
    })
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageY
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      paddingTop: e.touches[0].pageY-100,
      ListTouchDirection: e.touches[0].pageY - this.data.ListTouchStart > 0 ? 'pull' : 'up'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'pull') {
      this.setData({
        pullShow: false
      })
    } 
    this.setData({
      ListTouchDirection: null,
      paddingTop:34
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
    let _this = this;
    setTimeout(function () {
      wx.stopPullDownRefresh();
      _this.setData({
        pullShow: !_this.data.pullShow
      });
    }, 500)
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
})