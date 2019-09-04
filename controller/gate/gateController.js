'use strict';

var Gate = require('../../model/gateModel.js');

exports.read_gate_by_branch = function(req, res) {
  Gate.getGateByBranchID(req.params.branchID, function(err, gate) {
    if (err)
    res.send(err);
    res.json({gate});
  });
};
