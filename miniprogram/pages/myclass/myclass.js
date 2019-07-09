// miniprogram/pages/myclass/myclass.js
import Dialog from 'vant-weapp/dialog/dialog';
const db = wx.cloud.database()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  backCourse(event){
    Dialog.confirm({
      title: '退选确认',
      message: '您真的决定退掉这个吗？错过了就不一定能再遇见了哦'
    }).then(() => {
      // on confirm
      wx.cloud.callFunction({
        name:'backCourse',
        data: {
          projectName:this.data.projectName,
        },
        success: res =>{
          wx.navigateBack({
            delta:1
          })
          app.globalData.disSelect = false
        }
      })
    }).catch(() => {
      // on cancel
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.disSelect = null
    let openid = app.globalData.openid
    db.collection('userinfo').where({ _openid:openid}).field({projectName:true}).get().then(res => {
      this.setData({
        projectName: res.data[0].projectName
      })
    }).then(res=>{if (this.data.projectName == null) {
      Dialog.alert({
        message: '您还没有选课，快去主页看看吧'
      }).then(() => {
        wx.navigateBack({
          delta: 9
        })
        // on close
      });
    }}).then(res =>{
      db.collection('projects').where({projectName:this.data.projectName}).get().then(res=>{
        this.setData({
          desc:res.data[0].desc,
          teacher:res.data[0].teacher
        })
      })
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