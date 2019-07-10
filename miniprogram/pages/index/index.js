import Dialog from 'vant-weapp/dialog/dialog';
const db = wx.cloud.database()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    disabled: false
  },
  getpdf(event) {
    wx.cloud.downloadFile({
      fileID: event.target.id,
      success: res => {
        console.log(res)
        wx.openDocument({
          filePath: res.tempFilePath,
          success: (res) => {
            console.log('读取成功', res)
          },
          fail: (err) => {
            console.log('读取失败', err)
            Dialog.alert({
              message: '读取失败，如有需要请直接联系老师'
            })
          }
        })

      }
    })
  },
  select: function(event) {
    let projectName = event.target.id
    wx.cloud.callFunction({
      name: "selectCourse",
      data: {
        projectName,
        openid: app.globalData.openid
      },
    }).then(res => {
      if (res.result.stats.updated == 0) {
        Dialog.alert({
          message: '很抱歉当前课程已经没有余量了，您未选上，请重新选择'
        })
      } else{
        wx.cloud.callFunction({
          name: "addCourseToUser",
          data: {
            projectName,
            openid: app.globalData.openid
          },
          success: res1 => {
            Dialog.alert({
              message: '恭喜您选课成功'
            })
            this.setData({
              disabled: true
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection('projects').get().then(res => {
      this.setData({
        projects: res.data
      })
    })
    db.collection('userinfo').field({
      projectName: true
    }).get().then(res => {
      if (res.data[0].projectName != null) {
        this.setData({
          disabled: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    db.collection("userinfo")

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
    if(app.globalData.disSelect!=null){
      this.setData({
        disabled: app.globalData.disSelect
      })
    }
    this.setData({
      page: 0
    })
    db.collection('projects').orderBy('projectName', 'asc').get().then(res => {
      this.setData({
        projects: res.data
      }, res => {
        console.log("数据更新完成")
        wx.stopPullDownRefresh()
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let page = this.data.page + 20
    db.collection('projects').skip(page).get().then(res => {
      let new_data = res.data
      let old_data = this.data.projects
      this.setData({
        projects: old_data.concat(new_data),
        page: page
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})