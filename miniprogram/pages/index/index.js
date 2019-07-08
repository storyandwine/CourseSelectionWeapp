const db = wx.cloud.database()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0
  },
  select:function(event){
    let projectName = event.target.id
    wx.cloud.callFunction({
      name:"selectCourse",
      data:{
        openid:app.globalData.openid,
        projectName
      },
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('projects').get().then(res=>{
      this.setData({
        projects:res.data
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
    this.setData({
      page:0
    })
    db.collection('projects').orderBy('projectName','asc').get().then(res => {
      this.setData({
        projects: res.data
      },res=>{
        console.log("数据更新完成")
        wx.stopPullDownRefresh()
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = this.data.page +20
    db.collection('projects').skip(page).get().then(res => {
      let new_data = res.data
      let old_data = this.data.projects
      this.setData({
        projects: old_data.concat(new_data),
        page:page
      }, res => {
        console.log(res)
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})