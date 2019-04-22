const PORT = 8090;
const express = require('express');
const categoryRouter = require('./routes/admin/category');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();

app.listen(PORT, () => {
    console.log('Server Listening:' + PORT);
});

// 使用中间件
app.use(cors());
// app.use(bodyParser.urlencoded({}))   ////把application/x-www-form-urlencoded格式请求主题数据解析出来放入req.body属性
app.use(bodyParser.json());     //把json格式请求主题数据解析出来放入req.body属性
//挂在路由器
app.use('/admin/category', categoryRouter);