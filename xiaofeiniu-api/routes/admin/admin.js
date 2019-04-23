/*
* 管理员相关路由
*/
const express = require('express');
const pool = require('../../pool');
const router = express.Router();

module.exports = router;

/*
* API:    GET   /admin/login/:aname/:apwd
* 完成用户登陆验证（提示：有的项目中此处选择post请求
* 返回数据：
* {code:200, msg:'login success'}
* {code:400, msg:'aname or apwd wrong'}
*/
router.get('/login/:aname/:apwd', (req, res) => {
    var aname = req.params.aname;
    var apwd = req.params.apwd;
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)', [aname, apwd], (err, result) => {
        if (err) throw err;
        if(result.length>0){
            res.send({code:200, msg:'login success'});
        }else{
            res.send({code:400, msg:'aname or apwd wrong'});
        }
    });
});


/*
* API:    PATCH或PUT   /admin
* 请求数据：{aname:'xxx', oldPwd:'xxx',newPwd:'xxx}
* 根据管理员名和密码修改管理员密码
* 返回数据：
* {code:200, msg:'login success'}
* {code:400, msg:'aname or apwd not exists'}
* {code:400, msg:'apwd not modified'}
*/


router.get();