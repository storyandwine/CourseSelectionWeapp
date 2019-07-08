// pages/add/add.js
const db = wx.cloud.database()
const userCollection = db.collection('user')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  addData:function(event){
    wx.cloud.callFunction({
      name:"addData"
    }).then(res=>{
      console.log(res.data)
    })
    // console.log(event)
    // userCollection.add({
    //   data:{
    //     userName:"2016301200609",
    //     className:"计科1702",
    //     tags:["s","t","a"],
    //   },
    //   success:res=>{
    //     console.log(res)
    //   }
    // })
  }
})