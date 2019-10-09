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
        id:'number',
        typeId:'5'
      },
      {
        name: '题材',
        id: 'theme',
        typeId:'2'
      },
      {
        name: '类型',
        id: 'type',
        typeId:'3'
      },
      {
        name: '背景',
        id: 'background',
        typeId:'1'
      },
      {
        name: '难度',
        id: 'difficulty',
        typeId:'4'
      },
      // {
      //   name: '周边服务',
      //   id: '',
      //   typeId:''
      // },
    ],
    contentList:[], //所有分类数据
    selectList:[],  //当前分类数据
    selectId:'5',    //当前分类ID
    selectValue:''  //当前选中分类中的子分类的ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList()
  },
  // 返回上一页
  back() {
    wx.redirectTo({
      url: `/pages/playsList/index?selectId=${this.data.selectId}&selectValue=${this.data.selectValue}&type=2`,
    })
  },
  // 导航栏选择
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      selectList: this.data.contentList[e.currentTarget.dataset.name],
      selectId: e.currentTarget.dataset.typeid,
      selectValue: this.data.contentList[e.currentTarget.dataset.name][0].id
    })
  },
  // 选择人数
  bindPeople(e){
    this.setData({
      selectValue: e.currentTarget.dataset.id,
      peopleType: e.currentTarget.dataset.index
    })
  },
  // 获取分类
  getCategoryList(){
    app.http('getCategoryList')
    .then(value=>{
      if(value.code == 200){
        this.setData({
          contentList: value.data,
          selectList: value.data.number,
          selectValue:value.data.number[0].id
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