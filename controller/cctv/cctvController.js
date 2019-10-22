'use strict';

var Tariff = require('../../model/cctvModel.js');

exports.read_cctv_byBranch = function(req, res) {
  Tariff.getCctvByBranch(req.params.branchID, function (err, result) {
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