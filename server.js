var express    = require('express'),		
    app        = express(), 				
    bodyParser = require('body-parser'), 	
    morgan     = require('morgan'), 		
    mongoose   = require('mongoose'),
    config 	   = require('./config'),
    path 	   = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
}); 
mongoose.connect(config.database); 

var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

var mobiRoutes = require('./app/routes/mobiapi')(app,express);
app.use('/mobiapi',mobiRoutes);

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);
console.log('Server running on port ' + config.port);