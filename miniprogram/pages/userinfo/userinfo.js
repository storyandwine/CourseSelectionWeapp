const db = wx.cloud.database()
const userCollection = db.collection('userinfo')
const _ = db.command
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    name: "",
    type: "",
    columns: ['一班', '二班', '三班', '四班', '教师'],
    openid: "",
    disabled: false
  },
  setName(event) {
    this.setData({
      name: event.detail
    })
  },
  setId(event) {
    this.setData({
      id: event.detail
    })
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      type: index
    })
  },
  updateInfo: function(event) {
    userCollection.add({
      data: {
        name: this.data.name,
        id: this.data.id,
        type: this.data.type
      },
      success: res => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    userCollection.where({
      _openid: app.globalData.openid
    }).get().then(res => {
      this.setData({
        id: res.data[0].id,
        name: res.data[0].name,
        type: res.data[0].type,
        disabled: true
      })
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