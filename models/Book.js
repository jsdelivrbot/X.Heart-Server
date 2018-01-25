/*
 * @Author: X_Heart
 * @Date: 2017-06-09 10:36:50
 * @Last Modified by: X_Heart
 * @Last Modified time: 2017-06-10 20:59:58
 * @description: Book类
 */
const mongoose = require('mongoose')
const db = require('./db')
// 结构
const bookSchema = new mongoose.Schema({
    name: {type: String},
    author: {type: String},
    price: {type: Number}
    // type: {type: Array}
})
// bookSchema增加静态方法
// 列出所有图书
bookSchema.statics.findBookList = function(callback) {
  this.model('Book').find({}, callback)
}
// 查找图书
bookSchema.statics.findBookById = function(id, callback) {
  this.model('Book').find({"_id": mongoose.Types.ObjectId(id)}, callback)
}
// 修改图书
bookSchema.statics.updateBook = function(id, json, options, callback) {
  this.model('Book').update({"_id": mongoose.Types.ObjectId(id)}, json, options, callback)
}
// 删除图书
bookSchema.statics.removeBook = function(id, callback) {
  this.model('Book').remove({"_id": mongoose.Types.ObjectId(id)}, callback)
}

const bookModel = db.model("Book", bookSchema)

module.exports = bookModel