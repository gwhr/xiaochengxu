// components/other-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    txt:{
      type:String
    },
    path:{
      type: String
    },
    data:{
      type:Array
    }
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
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      // 详情页查询所需id
      let id = e.currentTarget.dataset.id || ''
      // 详情页掉哪个接口
      let detail_IP = e.currentTarget.dataset.detail_IP || ''
      console.log(id)
      wx.navigateTo({
        url: '/pages/' + this.data.path + '/index?id=' + id + '&detail_IP=' + detail_IP,
      })
    },
    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection == 'left') {
        this.setData({
          modalName: true
        })
      } else {
        this.setData({
          modalName: false
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },
  }
})