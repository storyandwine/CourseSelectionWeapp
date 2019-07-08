// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = wx.cloud.database()
const userCollection = db.collection('projects')
// 云函数入口函数
exports.main = async (event, context) => {
  return await userCollection.add({
    data:{
      projectName:"Java",
      tags:["Java","工程"],
      teacher:"黄钰",
      desc:"FTP工程开发实战"
    }
  })
}