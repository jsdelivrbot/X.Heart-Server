/*
 * @Author: X_Heart
 * @Date: 2017-06-09 10:46:38
 * @Last Modified by: wangxiaoxin
 * @Last Modified time: 2018-03-22 17:26:36
 * @description: 
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const router = require('./router/router')
const axios = require('axios')

// 设置模板引擎
app.engine('html', ejs.__express)
app.set('view engine', 'html')

app.set('port', (process.env.PORT || 5000));
// 静态文件中间件
app.use(express.static('./public'))
// req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 首页
app.get('/', router.showIndex)

var apiRoutes = express.Router()
app.use('/api', apiRoutes)

// vue-music
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

// elm
var appData = require('./data.json')

app.get('/api/seller',function(req,res){
  res.json({
      errno: 0,
      data: appData.seller
  });
});

app.get('/api/goods',function (req,res) {
  res.json({
      errno: 0,
      data: appData.goods
  });
});

app.get('/api/ratings',function (req,res) {
  res.json({
      errno: 0,
      data: appData.ratings
  });
});

// 转https服务
app.post('/server',function (req,res) {
  const url = req.body.url
  const method = req.body.method || 'POST'
  const headers = req.body.headers || {}
  if (url) {
    axios({
        method,
        url,
        headers,
        params: req.body,
    }).then((response) => {
      var data = response.data
      res.json({
        error: 0,
        data,
        message: 'sucess'
      })
    }).catch((e) => {
      res.json({
        error: 1,
        message: e
      })
    })
  } else {
    res.json({
      error: 1,
      message: '需要传url参数！'
    })
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});