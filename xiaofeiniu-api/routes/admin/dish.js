const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/*
*GET /admin/dish
*获取所有的菜品（按类别分类
*返回数据：
*[
*    {cid:1,cname:'肉类',dishList：[{},{},...]}
*   {cid:1,cname:'肉类',dishList：[{},{},...]}
*]
*/
router.get('/', (req, res) => {
    // 为了获得所有菜品，必须先查询菜品类别
    pool.query('SELECT cid,cname FROM xfn_category ORDER BY cid', (err, result) => {
        if (err) throw err;
        res.send(result);
        //循环遍历每个菜品类别，查询该类别下有哪些菜品
        var categoryList = result;
        var finishCount = 0; //已经查询完的菜品类别的数量
        for (let c of categoryList) {
            pool.query('SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC', c.cid, (err, result) => {
                if (err) throw err; 
                c.dishList = result;
                //必须保证所有的类别下的菜品都查询完成后才能发送响应消息————这些查询都是异步执行的
                finishCount++;
                if (finishCount == categoryList.length) {
                    res.send(categoryList);
                }
            })
        }
    });
})























