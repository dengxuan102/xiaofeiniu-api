const mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    database: 'xiaofeiniu',
    connectionLimit:10
});
module.exports = pool;