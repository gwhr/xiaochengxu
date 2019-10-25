// pages/wantSeek/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLack: true, // 是否显示还差多少人
    storeList: [], // 地址数组
    storeObject: [], // 地址信息
    storeIndex: 0,
    date: '',
    startDate: '', // 默认从当天开始
    timeList: [], // 时间段数组
    timeObject: [], // 时间段信息
    timeIndex: 0,
    script_id: 0,
    userToken:''
  },
  toCreated() {
    // wx.navigateTo({
    //   url: '/pages/createSeek/index',
    // })
    if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined) {
      wx.showToast({
        title: '请登录后重试',
        icon:'none'
      })
      return
    }
    let parmas = {
      userToken: wx.getStorageSync('token'),
      script_id: this.data.script_id - 0,
      store_id: this.data.storeObject[this.data.storeIndex].id - 0,
      time_id: this.data.timeObject[this.data.timeIndex].id - 0,
      // number_id : 1,
      start_date: app.timestamp(this.data.date) / 1000 + '',
      // userToken: this.data.userToken
    }
    app.http('makeGame', parmas).then(res => {
      console.log(res)
      if (res.code == 200) {
        // 提示数据 + 成功
        wx.navigateTo({
          // url: '/pages/orderSuccess/index',
          url: '/pages/jungle/index',
        })
      } else {
        // 提示原因
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })

  },
  jionDy(){
    let parmas = {
      script_id: this.data.script_id - 0,
      address_id: this.data.storeObject[this.data.storeIndex].id - 0,
      time_id: this.data.timeObject[this.data.timeIndex].id - 0,
      // number_id : 1,
      start_date: app.timestamp(this.data.date) - 0
    }
    app.http('makeGame', parmas).then(res => {
      console.log(res)
      if (res.code == 200) {
        // 提示数据 + 成功
      } else {
        // 提示原因
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 从创建野区-选择剧本来
    if (options.comfrom == 'createSeet') {
      this.setData({
        showLack: false
      })
    }
    // 从加入打野-选择剧本来
    // if (options.comfrom == 'joinSeet') {
    //   this.setData({
    //     showLack: true
    //   })
    // }
    this.setData({
      script_id: options.id,
      userToken:app.globalData.userToken
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
    // 获取picker信息
    this.getOptionsInfo()
    // 日期初始值
    let nowDate = app.formatTime(new Date(), 2);
    this.setData({
      date: nowDate,
      startDate: nowDate
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

  },

  /**
   * 获取picker选项
   */
  getOptionsInfo: function () {
    app.http('getOptionsInfo').then(res => {
      if (res.code == 200) {
        console.log(res)
        this.setData({
          // 地址选项
          storeList: res.data.storeList.map(item => item.name),
          // 地址详细信息
          storeObject: res.data.storeList,
          // 时间段选项
          timeList: res.data.timelist.map(item => item.name),
          // 时间段详细信息
          timeObject: res.data.timelist,
        })
      }
    })
  },

  /**
   * 选择地址
   */
  bindStoreListPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      storeIndex: e.detail.value
    })
  },

  /**
   * 选择预约日期
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 选择时间段
   */
  bindTimelistPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      timeIndex: e.detail.value
    })
  },
})