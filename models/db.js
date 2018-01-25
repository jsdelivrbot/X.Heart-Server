/*
 * @Author: X_Heart
 * @Date: 2017-06-09 10:33:51
 * @Last Modified by: X_Heart
 * @Last Modified time: 2017-06-10 00:12:14
 * @description: mongoose数据库
 */
const mongoose = require('mongoose')
const uristring = 'mongodb://x_heart:546593797@ds113702.mlab.com:13702/xheart'
const db = mongoose.createConnection(uristring)

db.once('open', (callback) => {
  console.log('数据库连接成功')
})

module.exports = db