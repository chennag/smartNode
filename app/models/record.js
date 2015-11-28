var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecordSchema = new Schema({
	sno: 		  {type: Number,required:true,index: { unique: true }},
	type: 		  {type: String, required: true},
	description:  {type: String, required: true},
	status: 	  {type: String, required:true},
	approval_user:{type: String, required:true},
});

module.exports = mongoose.model('Record',RecordSchema);