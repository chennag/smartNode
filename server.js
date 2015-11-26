var express = require('express'),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    nconfig = require('nconfig'),
    http = require('http'),
    app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());    

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

