//index.js
//获取应用实例
const app = getApp()
// pages/playsList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playListTitle: '全部剧本', //title
    indexs:0,
    navList:['全部','独家','城限','盒装','预售'],
    path:'',
    comfrom: '',
    pageNumber:1,
    pageSize:6,
    type:0,
    keywords:'',
    dataList:[],
    searchParams:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      path: options.path ? options.path : '',
      comfrom: options.comfrom ? options.comfrom : ''
    })
    // type: 3 从穿件野区-选择剧情跳转来
    console.log(options)
    if (options.path == 'wantSeek') {
      // 修改标题
      this.setData({
        playListTitle: '请选择剧本'
      })
    }
    if (options.type == 2){
      this.setData({
        searchParams: options
      })
      this.getSearchList();
      return
    }
    this.getAllList();
  },
  // 获取全部剧本
  getAllList(){
    wx.hideToast();
    let params = {
      pageNumber:this.data.pageNumber,
      pageSize:this.data.pageSize,
      type:this.data.type,
      keywords:this.data.keywords,
    }
    app.http('getAllList',params)
    .then(value=>{
      if(value.code == 200){
        this.setData({
          dataList: this.data.dataList.concat(value.data.list)
        })
      }else{
        this.setData({
          dataList: []
        })
        wx.showToast({
          title: `${value.message}`,
          icon:'none',
          duration: 2000
        })
      }
      
    })
  },
  // 获取分类筛选剧本
  getSearchList(){
    let params = {
      type: this.data.searchParams.selectId,
      pageNumber: this.data.pageNumber,
      pageSize: this.data.pageSize,
      value: this.data.searchParams.selectValue,
    }
    app.http('getSearchList', params)
    .then(value=>{
      if (value.code == 200) {
        this.setData({
          dataList: this.data.dataList.concat(value.data.list)
        })
      } else {
        this.setData({
          dataList: []
        })
        wx.showToast({
          title: `${value.message}`,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //搜索剧本
  searchPlays(e){
    this.setData({
      keywords: e.detail.value
    })
    this.getAllList();
    // if(e.detail.value != ''){
    //   wx.navigateTo({
    //     url: '/pages/playsDetail/index',
    //   })
    // }
  },
  //剧本详情
  toDetail(e){
    if (this.data.path == '' || this.data.path == null) {
      wx.navigateTo({
        url: '/pages/playsDetail/index',
      })
    } else {
      if (this.data.comfrom == '') {
        wx.navigateTo({
          url: '/pages/' + this.data.path + '/index',
        })
      } else {
        // 从创建打野来, 进入详情页 不显示差几个人
        wx.navigateTo({
          url: '/pages/' + this.data.path + '/index?comfrom=' + this.data.comfrom + '&id=' + e.currentTarget.dataset.id,
        })
      }
    }
    
  },
  // 导航栏
  chooseNav(e) {
    this.setData({
      type: e.currentTarget.id,
      indexs: e.currentTarget.dataset.indexs
    })
    this.getAllList();
  },
  // 跳转筛分类选页
  totypeList(){
    wx.redirectTo({
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
    if (this.data.dataList.length < this.data.pageNumber * 5) {
      return
    }
    this.setData({
      pageNumber: (this.data.pageNumber + 1)
    })
    this.getAllList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})