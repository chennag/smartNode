"use strict";

var request = require('request'),
    username = "mani",
    password = "admin",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


var options = {
    url: "https://volteollcdemo1.service-now.com/api/now/table/u_vps_record?sysparm_limit=10",
    headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info);
        return "Record Processed";
    } else {
        return error;
    }
}

var getAllRecords = function() {
    request(options, callback);
};
/*   Data JSON format from servicenow get call 
{ result: 
   [ { u_doc_date: 'de',   // doc_date
       sys_id: 'cd42bf3a0f689a000a02a109b1050ef8',
       sys_updated_on: '2015-12-29 16:53:50',
       sys_created_on: '2015-12-29 16:53:50',
       sys_created_by: 'mani',
       u_vessel_code: 'de', //vessel_Code
       sys_tags: '',
       sys_updated_by: 'mani',
       u_vessel_name: 'de',  //vessel_name
       sys_mod_count: '0',
       u_doc_num: '0',  //docnum
       u_san_no: 'de',  //sanno
       u_number: 'VPS0001015' 
       } 
    ] 
}
*/
var postRecords = function(record) {
    var rec = {
        "u_doc_date": record.doc_date,
        "u_vessel_code": record.vessel_code,
        "u_vessel_name": record.vessel_name,
        "u_doc_num": record.docnum,
        "u_san_no": record.sanno
    }
    options.body = JSON.stringify(rec);
    request.post(options, callback);
}

module.exports = {
    getAllRecords: getAllRecords,
    postRecords: postRecords
}
