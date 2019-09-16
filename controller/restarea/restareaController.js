'use strict';

var RestArea = require('../../model/restareaModel.js');

exports.list_all_restarea = function(req, res) {
  RestArea.getAllRestArea(function(err, restarea) {
    if (err)
      res.send(err);
      res.send({ restarea });
  });
};