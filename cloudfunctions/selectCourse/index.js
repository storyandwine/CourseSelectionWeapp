// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  let res = await db.collection('projects').where({
    projectName: event.projectName,
    num: _.gt(0)
  }).update({
    data: {
      num: _.inc(-1),
      student: _.push(event.openid)
    }
  })
  if (res.stats.update != 0) {
    db.collection('userinfo').where({
      _openid: event.openid,
    }).update({
      data: {
        projectName: event.projectName
      }
    })
  }
  return res
}