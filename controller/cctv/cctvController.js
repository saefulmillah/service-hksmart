'use strict';

var Tariff = require('../../model/cctvModel.js');

exports.read_cctv_byBranch = function(req, res) {
  Tariff.getCctvByBranch(req.params.branchID, function (err, cctv) {
  	if (err)
    res.send(err);
    res.json({cctv});
  });
};