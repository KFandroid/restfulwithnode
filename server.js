const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 1234

const router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening')
    next()
})

router.get('/', function(req, res){
    res.json({message: 'hooray! welcome to our api!'})
})

router.route('/bears')
    .post(function(req, res) {
        res.json({message: 'POST!!!'})
    })

router.route('/bears/:bear_id')

// 根据id获取指定的bear (GET 请求 http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        console.log(req.params.bear_id)
    })
// 通过id更新指定的bear (put 请求 http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {
        res.json({message: 'put!!!'})
    })
    .delete(function(req, res) {
        console.log(req.params)
        res.json({message: 'delete!!!'})
    })

// 注册路由
// 所有的路由会加上“／api”前缀
app.use('/api', router)

app.listen(port)
console.log('Magic happens on port ' + port)