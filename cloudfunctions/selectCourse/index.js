// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('userinfo').where({
    _openid:event.openid,
  }).update({
    data:{
      projectName: event.projectName
    }
  });
  await db.collection('projects').where({projectName:event.projectName,}).update({
    data:{
      num:_.inc(-1)
    }
  })
}