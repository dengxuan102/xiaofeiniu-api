const express = require('express');
const pool = require('../../pool');
var router = express.Router();
var body = express('body-Parser')
module.exports = router;


//获取所有菜品类别
router.get('/', (req, res) => {
    pool.query('SELECT * FROM xfn_category ORDER BY cid', (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

//删除菜品类别
router.delete('/:cid', (req, res) => {
    // 删除有外键依赖的记录时要先解决外键依赖
    pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?', req.params.cid, (err, result) => {
        if (err) throw err;
        pool.query('DELETE FROM xfn_category WHERE cid=?', req.params.cid, (err, result) => {
            if (err) throw err;
            //获取delete语句在数据库中影响的行数
            if (result.affcetedRows > 0) {
                res.send({ code: 200, msg: '1 category' });
            } else {
                res.send({ code: 400, msg: '0 category deleted' });
            }
        })    
    }) 
});

// 增加菜品类别
router.post('/', (req, res) => {
    var data = req.body;    //形如{cname：‘xx'}
    pool.query('INSERT INTO xfn_category SET ?', data, (err, result) => {
        if (err) throw err;
        res.send({ code: 200, msg: '1 category added' });
    })
});

// 根据菜品类别编号修改该类别
router.put('/', (req, res) => {
    var data = req.body;    //请求数据{cid:xx,cname:'xx'}
    console.log(data);
    //TODO：此处可以对数据进行验证
    pool.query('UPDATE xfn_category SET ? WHERE cid=?', [data, data.cid], (err, result) => {
        // console.log(result);
        if (err) throw err;
        if (result.updatedRows > 0) {
            res.send({ code: 200, msg: '1 category modified' });
        } else if (result.affcetedRows == 0) {
            res.send({ code: 401, msg: 'category not exists' })
        } else if (result.affcetedRows == 1 && updatedRows == 0) {
            res.send({ code: 401, msg: 'no category modified' });
        }
    });
});