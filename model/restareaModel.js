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

RestArea.getRestAreaId = function (query, result) {
    var id = query
    var q = "SELECT r.ID_REST_AREA, r.ID_BRANCH, r.REST_AREA_NAME, r.REST_AREA_LATITUDE, r.REST_AREA_LONGITUDE, r.REST_AREA_IMAGE, f.ID_FACILITY, f.FACILITY_NAME, d.ID_FACILITY_DETAIL, d.FACILITY_DETAIL_NAME FROM `m_rest_area` r INNER JOIN map_facility m ON r.ID_REST_AREA = m.ID_REST_AREA INNER JOIN m_facility f ON m.ID_FACILITY = f.ID_FACILITY LEFT JOIN m_facility_detail d ON f.ID_FACILITY = d.ID_FACILITY AND d.ID_REST_AREA = r.ID_REST_AREA WHERE m.ID_REST_AREA = ?"
    sql.query(q, id, function (err, res) {
        if (err) {
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

module.exports= RestArea;