'use strict';

var Cctv = require('../../model/cctvModel.js');

exports.read_cctv_byBranch = function(req, res) {
  Cctv.getCctvByBranch(req.params.branchID, function (err, cctv) {
  	if (err)
    res.send(err);
    res.json({cctv});
  });
};