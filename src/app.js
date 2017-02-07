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
});