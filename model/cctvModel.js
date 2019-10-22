'user strict';
var sql = require('./db.js');

//Cabang object constructor
var Cctv = function(cctv){
    
    this.cctv_url = cctv.cctv_url;
    this.cctv_name = cctv.cctv_name;
    this.cctv_desc = cctv.cctv_desc;
    this.cctv_lat = cctv.cctv_lat;
    this.cctv_lon = cctv.cctv_lon;
    this.created_at = cctv.created_at;
    this.created_by = cctv.created_by;
    this.branch_id = cctv.branch_id;

};


Cctv.getCctvByBranch = function getCctvByBranch(BranchId, result) {
    // console.log("model log 1 "+query)
    // console.log("model log 2 "+query.GATE_ORIGIN_ID)
    // var a = JSON.parse(query);
    // console.log(a);
    // console.log(a.GATE_DESTINATION_ID);
    // return
    // console.log(a.GATE_ORIGIN_ID)
    // return
    // console.log(a)
    // console.log(a["GATE_ORIGIN_ID"])
    // console.log(a.GATE_ORIGIN_ID)
    // return
    // console.log("SELECT * FROM map_tariff WHERE GATE_ORIGIN_ID ="+ query.GATE_ORIGIN_ID+"  AND GATE_DESTINATION_ID = "+query.GATE_DESTINATION_ID+" AND GOL_ID = "+query.GOL_ID )
    sql.query("SELECT * FROM m_cctv WHERE branch_id ="+ BranchId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  
}

module.exports = Cctv;