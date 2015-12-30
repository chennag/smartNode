var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    http = require('http'),
    https = require('https'),
    mongoose = require('mongoose'),
    errorHandler = require('errorhandler'),
    config = require('./config'),
    path = require('path');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });

if ('development' == app.get('env')) {
    app.use(errorHandler());
    mongoose.connect(config.database);
    console.log("In development mode");
} else {
    app.use(errorHandler());
    mongoose.connect(config.prodDB);
    console.log("In production mode");
}



//Connection to Mongoose Database


mongoose.connection.on('open', function() {
    console.log('Connected to Mongoose');
});
mongoose.connection.on('error', function() {
    console.log('error in mongoose connections');
})

var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// mobile api (no security restriction)
var mobiRoutes = require('./app/routes/mobiapi')(app, express);
app.use('/mobiapi', mobiRoutes);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(config.port);

console.log('Express server listening on port::' + config.port);
