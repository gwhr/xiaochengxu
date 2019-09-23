//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    listData: [],
    PageCur: 'basics',
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad() {
    // 初始化towerSwiper 传已有的数组名即可
    this.getList();
  },
  // 获取列表数据
  getList() {
    let params = {
      pageNumber: 1,
      pageSize: 6
    }
    app.http('getIndexList', params)
      .then(value => {
        this.setData({
          listData:value.data.list
        })
        console.log(value)
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
  }
})