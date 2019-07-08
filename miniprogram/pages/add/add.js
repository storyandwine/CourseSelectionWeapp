// pages/add/add.js
const db = wx.cloud.database()
const ProjectsCollection = db.collection('projects')
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
  onClose() {
    this.setData({ show: false });
  },
  submit:function(event){
    ProjectsCollection.add({
      data: {
        projectName: this.data.projectName,
        teacher: "黄钰",
        desc: this.data.desc
      },
      success:res=>{
        this.setData({ show: true });
        onClose();
        console.log(res)
      }
    })
  }
})