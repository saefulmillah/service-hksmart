'use strict';

var Tariff = require('../../model/tariffModel.js');

exports.read_tariff_by_filter = function(req, res) {
  var a = req.body
  var b = a.jsonReqTariff
  // var cleanb = b.replace(/['"]+/g, '');
  // console.log(req.body)
  console.log(a)
  console.log(b)
  // return
  Tariff.getTariffByFilter(b, function (err, resTariff) {
  	if (err) {
  		res.send(err)
  	} else {
		console.log(resTariff)
      // res.json(resTariff);
  		res.status(200).json({
  			status : "success",
  			data : {resTariff}
  		});
  	}
  });
};