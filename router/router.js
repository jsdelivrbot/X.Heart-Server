/*
 * @Author: X_Heart
 * @Date: 2017-06-09 10:49:47
 * @Last Modified by: X_Heart
 * @Last Modified time: 2017-06-10 21:04:03
 * @description: 
 */
const Book = require('../models/Book')
// 显示图书列表
exports.showIndex = function(req, res, next) {
  Book.findBookList((err, result) => {
    res.render('index', {
      "booklist": result
    })
  })
}
// 显示添加书页面
exports.addBook = function(req, res, next) {
    res.render('addbook')
}
// 添加图书业务
exports.doAdd = function(req, res, next) {
    Book.create(req.query, (err) => {
      if (err) {
        res.render('carry',{
          "title": "添加失败"
        })
      }
      res.render('carry',{
        "title": "添加成功"
      })
    })
}
// 修改图书页面
exports.editBook = function(req, res, next) {
  let id = req.query.id
    Book.findBookById( id, (err, result) => {
      res.render('editbook', result[0])
    })
}
// 修改图书业务
exports.doEdit = function(req, res, next) {
  let id = req.params["id"]
    Book.updateBook(id, {$set: req.query}, {}, (err, result) => {
      if (err) {
        res.render('carry',{
          "title": "修改失败"
        })
      }
      res.render('carry',{
        "title": "修改成功"
      })
    })
}
// 删除业务
exports.doDel = function(req, res, next) {
  let id = req.query.id
    Book.removeBook(id, (err) => {
      if (err) {
        res.render('carry',{
          "title": "删除失败"
        })
      }
      res.render('carry',{
        "title": "删除成功"
      })
    })
}