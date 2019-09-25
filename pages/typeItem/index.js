//index.js
//获取应用实例
const app = getApp()
// pages/typeItem/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    peopleType:0,
    scrollLeft: 0,
    typeList:[
      {
        name:'人数',
        id:'number'
      },
      {
        name: '题材',
        id: 'theme'
      },
      {
        name: '类型',
        id: 'type'
      },
      {
        name: '背景',
        id: 'background'
      },
      {
        name: '难度',
        id: 'difficulty'
      },
      {
        name: '周边服务',
        id: ''
      },
    ],
    contentList:[],
    selectList:[],
    peopleList: ['3人', '4人', '5人', '6人', '7人','7人以上'],
    subList: [{ 'name': '恐怖', 'img': '' }, { 'name': '欢乐', 'img': '' }, { 'name': '情感', 'img': '' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList()
  },
  // 返回上一页
  back() {
    wx.navigateBack({
      
    })
  },
  // 导航栏选择
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      selectList: this.data.contentList[e.currentTarget.dataset.name]
    })
  },
  // 选择人数
  bindPeople(e){
    this.setData({
      peopleType: e.currentTarget.dataset.id,
    })
  },
  // 获取分类
  getCategoryList(){
    app.http('getCategoryList')
    .then(value=>{
      console.log(value)
      if(value.code == 200){
        this.setData({
          contentList: value.data,
          selectList: value.data.number
        })
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