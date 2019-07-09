// pages/add/add.js
import Dialog from 'vant-weapp/dialog/dialog';
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
    show:false,
    disabled:false,
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
  onClose() {
    this.setData({ show: false });
  },
  submit:function(event){
    ProjectsCollection.add({
      data: {
        projectName: this.data.projectName,
        teacher: this.data.userName,
        desc: this.data.desc,
        num:this.data.num,
        keyWords:this.data.keyWords
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
      if(res.data[0].type==4){
        this.setData({
          userName: res.data[0].name
        })
      }else{
        Dialog.alert({
          message: '您暂时没用开课的权限，如有需要请与管理员联系'
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