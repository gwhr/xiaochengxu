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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
      wx.navigateTo({
        url: '/pages/playsDetail/index',
      })
    }
  }
})
