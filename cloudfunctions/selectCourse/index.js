// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('projects').where({projectName:event.projectName,num:_.gt(0)}).update({
    data:{
      num:_.inc(-1)
    }
  })
  await db.collection('userinfo').where({
    _openid: event.openid,
  }).update({
    data: {
      projectName: event.projectName
    }
  })
}