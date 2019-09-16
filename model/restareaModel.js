'user strict';
var sql = require('./db.js');

//Cabang object constructor
var RestArea = function(restarea){
    this.ID_MAP_FACILITY=restarea.id_map_facility;
    this.ID_BRANCH=restarea.id_branch;
    this.BRANCH_NAME=restarea.branch_name;
    this.ID_REST_AREA=restarea.id_rest_area;
    this.REST_AREA_NAME=restarea.rest_area_name;
    this.REST_AREA_LATITUDE=restarea.rest_area_latitude;
    this.REST_AREA_LONGITUDE=restarea.rest_area_longitude;
    this.FACILITY_NAME=restarea.facility_name;
    this.created_at = new Date();
};
// RestArea.getBranchById = function (BranchID, result) {
//         sql.query("Select BRANCH_NAME from ms_branch where ID = ? ", BranchID, function (err, res) {             
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     result(null, res);
              
//                 }
//             });   
// };
RestArea.getAllRestArea = function (result) {
        sql.query("SELECT b.ID_REST_AREA, b.REST_AREA_NAME, b.REST_AREA_LATITUDE, b.REST_AREA_LONGITUDE FROM m_rest_area b", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('restarea : ', res);  

                 result(null, res);
                }
            });   
};

module.exports= RestArea;