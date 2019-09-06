'use strict';

var Tariff = require('../../model/tariffModel.js');

exports.read_tariff_by_filter = function(req, res) {
  var get_tariff = req.body
  // console.log(get_tariff.GATE_ORIGIN_ID);
  // return

  Tariff.getTariffByFilter(get_tariff, function (err, result) {
  	if (err) {
  		res.send(err);
  	} else {
  		res.status(200).json({
  			status : "success",
  			data : result 
  		});
  	}
  });
  Tariff.getTariffByFilter(req.params.GateOriginID, req.params.GateDestinationID, req.params.GolID, function(err, tariff) {
    if (err)
    res.send(err);
    res.json({tariff});
  });
};
