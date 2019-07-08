// pages/add/add.js
const db = wx.cloud.database()
const ProjectsCollection = db.collection('projects')
const userCollection = db.collection('userinfo')
var app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectName: "",
    desc: "",
    show:false
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({ projectName:event.detail})
  },
  desc(event){
    this.setData({desc: event.detail })
  },
  setNum(event){
    this.setData({num:parseInt(event.detail)})
  },
  onClose() {
    this.setData({ show: false });
  },
  submit:function(event){
    ProjectsCollection.add({
      data: {
        projectName: this.data.projectName,
        teacher: this.data.userName,
        desc: this.data.desc,
        num:this.data.num
      },
      success:res=>{
        this.setData({ show: true });
        onClose();
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid = app.globalData.openid
    userCollection.where({ _openid: openid }).get().then(res => {
      console.log(res)
      this.setData({
        userName: res.data[0].name
      })
    })
  },
})