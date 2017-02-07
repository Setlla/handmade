var restify = require('restify');
var index = require('./routes/main');

var ip_addr = '127.0.0.1';
var port    =  '8080';

var server = restify.createServer({
    name : "handmade",
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get('/hello', index.list);
server.del('/hello/:ID', index.deleteOne);
server.post('/hello/:name', index.findOne);

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});;// 连接mysql
var mysql = require('mysql2');
var pool = mysql.createPool({
    host: '192.168.1.250',
    user: 'hsp',
    password: '123456',
    database:'hsp2',
    port: 3306,
    useConnectionPooling: true
});

module.exports = pool;;;var pool = require('../db/conn');

//find all 
var list = function respond(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query( { 
			sql: 'select * from facstate'
		},function(err, rows, fields) {
			connection.release();
    		if (err) throw err; 
	        console.log('The ID is: ', title = rows[0].ID); 
	        res.charSet('utf-8');
	    	res.send(200, res.json(rows));
		});  
   return next();
	});
};

//find one
var findOne = function respond(req, res, next){
	pool.getConnection(function(err, connection) {
		connection.prepare( { 
			sql: 'select * from facstate where Name LIKE ?'
		},function(err, statement) {
			if (err) throw err; 
			statement.execute([req.params.name], function (err, rows, columns) {
			    statement.close();
	    		if (err) throw err; 
		        console.log('The ID is: ', title = rows); 
		        res.charSet('utf-8');
		    	res.send(200, res.json(rows));
			});
		});  
   return next();
	});
};

//delete one
var deleteOne = function respond(req, res, next){
	res.send('hello test ' + req.params.name);
	next();
};

module.exports.list = list;
module.exports.findOne = findOne;
module.exports.deleteOne = deleteOne;