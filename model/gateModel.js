'user strict';
var sql = require('./db.js');

//Cabang object constructor
var Gate = function(branch){
    this.GATE_CODE = branch.gate_code;
    this.GATE_NAME = branch.gate_name;
    this.created_at = new Date();
};

Gate.getGateByBranchID = function (BranchID, result) {
        sql.query("Select * from ms_gate where BRANCH_ID = ? ", BranchID, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

module.exports= Gate;