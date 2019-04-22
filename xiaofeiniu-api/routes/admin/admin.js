/*
* 管理员相关路由
*/
const express = require('express');
const pool = require('../../pool');
const router = express.Router();

module.exports = router;

/*
* API:    GET   /admin/login?
* 请求数据：{aname:'xxx', apwd:'xxx'}
* 返回数据：
* {code:200, msg:'login success'}
* {code:400, msg:'aname or apwd wrong'}
*/

