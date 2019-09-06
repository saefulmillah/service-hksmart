'use strict';

var Tariff = require('../../model/tariffModel.js');

exports.read_tariff_by_filter = function(req, res) {
  var a = req.body
  var parseReq = a.jsonReqTariff
  console.log(parseReq)
  Tariff.getTariffByFilter(parseReq, function (err, result) {
  	if (err) {
  		res.send(err)
  	} else {
  		res.status(200).json({
  			status : "success",
  			data : result 
  		});
  	}
  });
};
