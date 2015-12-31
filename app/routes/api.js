var bodyParser = require('body-parser'),
    moment = require('moment'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    Record = require('../models/record'),
    config = require('../../config'),
    sn = require('../sn/servicenow');


var superSecret = config.secret;

module.exports = function(app, express) {
    var apiRouter = express.Router();

    apiRouter.post('/authenticate', function(req, res) {
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, superSecret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    res.json({
                        success: true,
                        message: 'Token Acquired',
                        token: token
                    });
                }
            }
        });
    });

    // route middleware to verify a token
    apiRouter.use(function(req, res, next) {
        console.log('Somebody just came to our app!');
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, superSecret, function(err, decoded) {
                if (err) {
                    res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    // Records CRUD methods 

    apiRouter.route('/records')
        .get(function(req, res) {
            Record.find({}, function(err, records) {
                if (err) res.send(err);
                res.json(records);
            })
        })
        .post(function(req, res) {
            var record = new Record();
            record.sanno = req.body.sanno;
            record.vessel_code = req.body.vessel_code;
            record.vessel_name = req.body.vessel_name;
            record.docnum = req.body.docnum;
            record.doc_date = new Date(req.body.doc_date); // format date
            record.status = req.body.status;
            record.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: '!! Record Succesfully Created !!'
                });
            })
        });

    apiRouter.route('/records/:id')
        .get(function(req, res) {
            Record.findById(req.params.id, function(err, records) {
                if (err) res.send(err);
                res.json(records);
            })
        })
        .put(function(req, res) {
            Record.findById(req.params.id, function(err, record) {
                if (err) res.send(err);
                if (req.body.sanno) record.sanno = req.body.sanno;
                if (req.body.vessel_name) record.vessel_name = req.body.vessel_name;
                if (req.body.vessel_code) record.vessel_code = req.body.vessel_code;
                if (req.body.status) record.status = req.body.status;
                if (req.body.docnum) record.docnum = req.body.docnum;
                if (req.body.doc_date) record.doc_date = new Date(req.body.doc_date); // format date
                record.save(function(err) {
                    if (err) res.send(err);
                    res.json({
                        message: '!! Record Succesfully Updated !!'
                    });
                })
            })
        })
        .patch(function(req, res) {
            Record.findById(req.params.id, function(err, record) {
                if (err) res.send(err);
                if (req.body.status) {
                    // sn.postRecords(record,function(error,response){
                    // 	if(!err){
                    // 		console.log(response);
                    // 	}
                    // 	else console.log(error)
                    // });
                    record.status = req.body.status;
                }
                record.save(function(err) {
                    if (err) res.send(err);
                    res.json({
                        message: '!! Record Succesfully updated !!'
                    });
                });

            });
        })
        .delete(function(req, res) {
            Record.remove({
                _id: req.params.id
            }, function(err, record) {
                if (err) res.send(err);
                res.json({
                    message: '!! Record Successfully deleted !!'
                });
            });
        });

    // Users CRUD methods

    apiRouter.route('/users')
        .post(function(req, res) {
            var user = new User();
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;
            user.type = req.body.type;
            user.save(function(err) {
                if (err) {
                    if (err.code == 11000)
                        return res.json({
                            success: false,
                            message: 'A user with that username already exists. '
                        });
                    else
                        return res.send(err);
                }
                res.json({
                    message: 'User created!'
                });
            });

        })
        .get(function(req, res) {
            User.find({}, function(err, users) {
                if (err) res.send(err);
                res.json(users);
            });
        });

    apiRouter.route('/users/:user_id')
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);
                res.json(user);
            });
        })
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;
                if (req.body.type) user.type = req.body.type;
                user.save(function(err) {
                    if (err) res.send(err);
                    res.json({
                        message: 'User updated!'
                    });
                });

            });
        })
        .delete(function(req, res) {
            User.remove({
                _id: req.params.user_id
            }, function(err, user) {
                if (err) res.send(err);
                res.json({
                    message: 'Successfully deleted'
                });
            });
        });

    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });
    return apiRouter;
};
