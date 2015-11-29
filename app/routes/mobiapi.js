var bodyParser = require('body-parser'); 	
var User       = require('../models/user');
var Record     = require('../models/record');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

module.exports = function(app,express){
	var mobiRouter = express.Router();
	mobiRouter.use(function(req,res,next){
		console.log('request came from moblie api');
		next();
	});

	mobiRouter.route('/records')
	     .get(function(req,res){
  			Record.find({},function(err,records){
  				if(err) res.send(err)
  				res.send(records);	
  			})
	     })
	     .post(function(req, res) {			
			var record = new Record();		
			record.sno = req.body.sno;  
			record.description = req.body.description;  
			record.type = req.body.type;  
            record.status = req.body.status
            record.approval_user = req.body.approval_user;
			record.save(function(err) {
				if (err) return res.send(err);
				res.json({ message: 'Record created!' });
			});

		})
	return mobiRouter;
};