"use strict";

var bodyParser = require('body-parser'),
    moment     = require('moment'),
    User       = require('../models/user'),
    Record     = require('../models/record'),
    jwt        = require('jsonwebtoken'),
    config     = require('../../config');

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
			console.log(req.body);		
			record.sanno = req.body.sanno;  
			record.vessel_code = req.body.vessel_code;  
			record.vessel_name = req.body.vessel_name  
            record.status = req.body.status
            record.docnum = req.body.docnum;
            record.doc_date = req.body.doc_date;
			record.save(function(err) {
				if (err) { 
					console.log(err);
					return res.send(err);
				}
				res.json({ message: 'Record created!' });
			});

		})
	return mobiRouter;
};