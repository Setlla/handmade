// 连接mysql
var mysql = require('mysql2');
var pool = mysql.createPool({
    host: '192.168.1.250',
    user: 'hsp',
    password: '123456',
    database:'hsp2',
    port: 3306,
    useConnectionPooling: true
});

module.exports = pool;