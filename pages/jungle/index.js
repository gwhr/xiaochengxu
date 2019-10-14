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
    pageNumber: 1 // 当前分页
  },
  showList(){
    if (!this.data.showList) {
      this.setData({
        showList: true,
      })
    } else {
      wx.navigateTo({
        url: '/pages/playsList/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 初始化towerSwiper 传已有的数组名即可
  },
  //创建打野
  toCreate(){
    wx.navigateTo({
      url: '/pages/createSeek/index',
    })
  },
  // 打野列表
  // 获取列表数据
  getList(pageSize = 5) {
    let params = {
      pageNumber: this.data.pageNumber,
      pageSize
    }
    app.http('getGameList', params).then(res => {
      if (res.code == 200) {
        this.setData({
          listData: this.data.listData.concat(res.data.list)
        })
      }
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
    this.getList();
    this.setData({
      showList: false,
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
    if (this.data.listData.length < this.data.pageNumber * 5) {
      return
    }
    this.setData({
      pageNumber: (this.data.pageNumber + 1)
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})