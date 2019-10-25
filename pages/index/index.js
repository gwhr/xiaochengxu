//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    listData: [],
    PageCur: 'basics',
    cardCur: 0,
    swiperList: [],
    pageNumber:1
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad() {

    // 初始化towerSwiper 传已有的数组名即可
    this.getList()
    this.getAdvertList()
  },
  toDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/playedDetail/index?id=${id}&from=1`,
    })
  },
  // 获取列表数据
  getList() {
    let params = {
      pageNumber: this.data.pageNumber,
      pageSize: 5
    }
    app.http('getIndexList', params)
      .then(value => {
        if(value.code == 200){
          this.setData({
            listData: this.data.listData.concat(value.data.list)
          })
        }
        
      })
  },
  // 获取轮播图
  getAdvertList(){
    let params = {
      position_id:1055
    }
    app.http('getIndexList', params)
      .then(value => {
        if(value.code == 200){
          this.setData({
            swiperList: value.data.list
          })
        }
      })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  toList() {
    wx.navigateTo({
      url: '/pages/playsList/index',
    })
  },
  // 上拉加载
  onReachBottom(){
    if (this.data.listData.length < this.data.pageNumber*5){
      return 
    }
    this.setData({
      pageNumber: (this.data.pageNumber + 1)
    })
    this.getList();
  },
  // 下拉刷新
  onPullDownRefresh(){
    wx.stopPullDownRefresh();
  }
})