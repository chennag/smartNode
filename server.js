var express = require('express');
var ejs = require('ejs');
var http = require('http');

var app = express();

// Web Interface API gateway 

app.get('/', function(req,res){
   res.send('hello World');
});

// Mobile API gateway


var port = process.env.PORT || 3000;
var server = http.createServer(app).listen(port);
server.on('close', function() {
   console.log('terminating server');
});
console.log('Express server listening on port: '+ port);

