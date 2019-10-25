// components/other-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    seekList: [{
      imgSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565005042626&di=baaa0e7760cc495c2cbfb42d64012d15&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180903%2Fd4b6378b81ab43569fc0048b62b6fedc.jpeg",
      title: "JOJOの奇妙冒险",
      explain: "盒装",
      explainChange: "false",
      explain_changeTxt: "8人进阶对抗",
      address: "北京-朝阳区-东大桥",
      timeDate: "2019-09-09",
      timeTime: "13:00-15:00",
      peopleNumber: 5
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow () {
    console.log(1)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toJion(e) {
      if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined) {
        wx.showToast({
          title: '请登录后重试',
          icon: 'none'
        })
        return
      }
      wx.navigateTo({
        url: '/pages/joinSeek/index?game_id=' + e.target.dataset.id,
      })
    }
  }
})