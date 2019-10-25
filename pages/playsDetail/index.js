// 获取应用实例
import Util from '../../utils/util.js'
const app = getApp()
// pages/playsDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    id:'',
    info:{},//详情页面数据
    address_list: [],//选择地址
    address_index:-1, //地址选择器的从第几个开始的下标(ps:默认从-1)
    appointment_date_list:[], //预约日期
    appointment_date_index:-1,//预约日期的从第几个开始的下标(ps:默认从-1)
    date: '',
    startDate: '', // 默认从当天开始
  },
  onPageScroll: function (e) {
    console.log(e);//{scrollTop:99}
    if (e.scrollTop >= 210) {
      this.setData({
        isShow:true
      })
    } else{
      this.setData({
        isShow: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })
    console.log(options)
    this.getDetails();
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
  // 地区插件
  bindRegionChange: function (e) {
    this.setData({
      address_index: e.detail.value,
    })
  },
  // 时间插件
  bindTimeChange: function (e) {
    this.setData({
      appointment_date_index: e.detail.value
    })
  },
  // 获取详情
  getDetails(){
    let params = {
      script_id:this.data.id
    }
    app.http('getScriptInfo', params)
    .then(value=>{
      if(value.code == 200){
        this.setData({
          info:value.data.info
        })
      }
    })
  //获取时间&地址
    app.http('getOptionsInfo')
    .then(res=>{
      if (res.code == 200){
        console.log(res)
        this.setData({
          address_list: res.data.storeList, //选择地址
          appointment_date_list:res.data.timelist //预约时间
        })
      }
    })
  },
  
  //返回
  back() {
    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  },
  //立即预约
  toOrder(){
    if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined) {
      wx.showToast({
        title: '请登录后重试',
        icon: 'none'
      })
      return
    }
    if (this.data.appointment_date_index == -1) {
      wx.showToast({
        title: '请选择预约时间段',
        icon: 'none'
      })
      return
    }
    if (this.data.address_index == -1) {
      wx.showToast({
        title: '请选择地址',
        icon:'none'
      })
      return
    }
    let params = {
      userToken: wx.getStorageSync('token'),
      script_id: this.data.id - 0,
      store_id: this.data.address_list[this.data.address_index].id,
      time_id: this.data.appointment_date_list[this.data.appointment_date_index].id,
      start_date: Util.timestamp(this.data.date) / 1000 + '',
      // number_id:1
    }
    app.http('makeAppointment', params).then(value => {
      if (value.code == 200) {
        wx.navigateTo({
          // url: '/pages/orderSuccess/index',
          url: '/pages/orderSuccess/index',
        })
      }else{
        wx.showToast({
          title: value.message,
          icon:'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})