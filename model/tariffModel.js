'user strict';
var sql = require('./db.js');

//Cabang object constructor
var Tariff = function(tariff){
    this.GATE_ORIGIN_ID = tariff.gate_origin_id;
    this.GATE_DESTINATION_ID = tariff.gate_destination_id;
    this.GOL_ID = tariff.gol_id;
    this.TARIFF_AMOUNT = tariff.tariff_amount;
    this.GATE_DESTINATION_ID = tariff.gate_destination_id;
};


Tariff.getTariffByFilter = function getTariffByFilter(query, result) {
    var obj = JSON.parse(query)
    console.log(obj.GOL_ID)
    console.log(obj)
    return
    // console.log("SELECT * FROM map_tariff WHERE GATE_ORIGIN_ID ="+ query.GATE_ORIGIN_ID+"  AND GATE_DESTINATION_ID = "+query.GATE_DESTINATION_ID+" AND GOL_ID = "+query.GOL_ID )
        // sql.query("SELECT * FROM map_tariff WHERE GATE_ORIGIN_ID ="+ query.GATE_ORIGIN_ID+"  AND GATE_DESTINATION_ID = "+query.GATE_DESTINATION_ID+" AND GOL_ID = "+query.GOL_ID , function (err, res) {             
        //     if(err) {
        //         console.log("error: ", err);
        //         result(err, null);
        //     }
        //     else{
        //         result(null, res);
        //     }
        // });  
}

module.exports= Tariff;