// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID
  return await db.collection('projects').where({ projectName: event.projectName }).update({
    data: {
      num: _.inc(1),
      student: _.pop(openid)
    }
  }).then(res=>(
    db.collection('userinfo').where({
      _openid: openid,
    }).update({
      data: {
        projectName: null
      }
    })
  ))
}