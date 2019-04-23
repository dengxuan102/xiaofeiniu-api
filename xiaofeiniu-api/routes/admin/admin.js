/*
* 管理员相关路由
*/
const express = require('express');
const pool = require('../../pool');
const router = express.Router();
const body = express('body-Parser');

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
        if (result.length > 0) {   //查询到一行数据，登陆成功
            res.send({ code: 200, msg: 'login success' });
        } else {    //没有查询到数据
            res.send({ code: 400, msg: 'aname or apwd wrong' });
        }
    });
});


/*
* API:    PATCH或PUT   /admin  //修改部分数据用patch,可以拿到请求主体
* 请求数据：{aname:'xxx', oldPwd:'xxx',newPwd:'xxx}
* 根据管理员名和密码修改管理员密码
* 返回数据：
* {code:200, msg:'login success'}
* {code:400, msg:'aname or apwd not exists'}
* {code:401, msg:'apwd not modified'}
*/
router.patch('/', (req, res) => {
    var data = req.body;
    //首先根据aname/oldName查询该用户是否存在
    //如果查询到了该用户，再修改其代码
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)', [data.aname, data.oldPwd], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.send({ code: 400, msg: 'password err' });
            return;
        }
        //如果查询到了用户，再修改其密码
        pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?', [data.newPwd, data.name], (err, result) => {
            if (err) throw err;
            if (result.changedRows > 0) {
                res.send({code:200,msg:'modified succ'});
            } else {
                res.send({ code: 401, msg: 'apwd not modified' });
            }
            
        })
    })
});

