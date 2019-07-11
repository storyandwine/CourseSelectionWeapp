// pages/add/add.js
import Dialog from 'vant-weapp/dialog/dialog';
const db = wx.cloud.database()
const ProjectsCollection = db.collection('projects')
const userCollection = db.collection('userinfo')
var app= getApp()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectName: "",
    desc: "",
    show:false,
    disabled:false,
  },
  upload(event) {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log(res, " :res")
        const tempFiles = res.tempFiles[0]
        wx.showLoading({
          title: '正在上传',
        })
        wx.cloud.uploadFile({
          cloudPath: tempFiles.name,
          filePath: tempFiles.path, // 文件路径
        }).then(res =>{
          console.log(res)
          // get resource ID
          that.setData({
            fileID: res.fileID
          })
          wx.hideLoading()
          Dialog.alert({
            message: '您已成功上传文档，感谢您为了学生的付出，辛苦啦'
          })
        })
      }
    })
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
  keyWords(event){
    this.setData({keyWords:event.detail})
  },

  submit:function(event){
    ProjectsCollection.add({
      data: {
        projectName: this.data.projectName,
        teacher: this.data.userName,
        desc: this.data.desc,
        num:this.data.num,
        keyWords:this.data.keyWords,
        fileID:this.data.fileID
      },
      success:res=>{
        Dialog.alert({
          message: '开课成功'
        })
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
      if(res.data[0].type==4){
        this.setData({
          userName: res.data[0].name
        })
      }else{
        Dialog.alert({
          message: '您暂时没有开课的权限，如有需要请与管理员联系'
        }).then(() => {
          this.setData({
            disabled:true
          })
          // on close
        })
      }
      
    })
  },
})