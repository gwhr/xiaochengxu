// components/index-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    DataList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
      list:[]
  },
  ready(){

  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/playedDetail/index?id=${id}&from=1`,
      })
    }
  }
})
