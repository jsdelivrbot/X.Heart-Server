/*
 * @Author: X_Heart
 * @Date: 2017-06-09 10:46:38
 * @Last Modified by: X_Heart
 * @Last Modified time: 2018-01-06 18:15:08
 * @description: 
 */
const express = require('express')
const app = express()
const ejs = require('ejs')
const router = require('./router/router')
const axios = require('axios')

// 设置模板引擎
app.engine('html', ejs.__express)
app.set('view engine', 'html')

app.set('port', (process.env.PORT || 5000));
// 静态文件中间件
app.use(express.static('./public'))
// 图书列表页
app.get('/', router.showIndex)
// 添加图书页面
app.get('/addbook', router.addBook)
// 添加图书业务
app.get('/doadd', router.doAdd)
// 修改图书页面
app.get('/editbook', router.editBook)
// 修改图书业务
app.get('/doedit/:id', router.doEdit)
// 删除业务
app.get('/dodel', router.doDel)

var apiRoutes = express.Router()
app.use('/api', apiRoutes)

app.get('/api/getDiscList', (req, res) => {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/api/lyric', (req, res) => {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/api/disc', (req, res) => {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});