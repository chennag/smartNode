var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema;

var RecordSchema = new Schema({
	sanno: 		  {type: Number,required:true,index: { unique: true }},
	vessel_code:  {type: String},
	vessel_name:  {type: String},
	docnum:       {type: String},
	doc_date:     {type: Date},
	status: 	  {type: String}
});
// 	sanno: 		  {type: Number,required:true,index: { unique: true }},
module.exports = mongoose.model('Record',RecordSchema);