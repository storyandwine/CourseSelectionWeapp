import Dialog from 'vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appId: "wx8abaf00ee8c3202e",
    extraData : {
      id: "66180",},
      pictures: [
        { url: 'https://ws1.sinaimg.cn/large/005VVb5fgy1g4tdpgfed9j30b405z3zm.jpg' },
        { url: 'https://ws1.sinaimg.cn/large/005VVb5fgy1g4tdw9v2azj30b405zmyi.jpg' },
        { url: 'https://ws1.sinaimg.cn/large/005VVb5fgy1g4tdhubea0j30b405yq2w.jpg' },
    ] 
  },
  github:function(event){
    wx.setClipboardData({
      data: 'https://github.com/storyandwine/CourseSelectionWeapp',
      success(res) {
        wx.getClipboardData({
          success(res) {
            Dialog.alert({
              message: 'Github开源地址已经复制，请粘贴到浏览器打开'
            })
            console.log(res.data) // data
          }
        })
      }
    })
  },
  tucao:function(event){
    wx.navigateToMiniProgram({
      appId: this.data.appId,
      extraData:this.data.extraData,
      version:"release"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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