'use strict';

var Tariff = require('../../model/cctvModel.js');

exports.read_cctv_byBranch = function(req, res) {
  var a = req.body
  // var b = a.jsonReqTariff
  // var cleanb = b.replace(/['"]+/g, '');
  // console.log(req.body)
  console.log(a)
  // console.log(b)
  // return
  Tariff.getCctvByBranch(b, function (err, result) {
  	if (err) {
  		res.send(err)
  	} else {
		console.log(result)
      // res.json(result);
  		res.status(200).json({
  			status : "success",
  			data : {result}
  		});
  	}
  });
};