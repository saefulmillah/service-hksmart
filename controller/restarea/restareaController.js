'use strict';

var RestArea = require('../../model/restareaModel.js');

exports.list_all_restarea = function(req, res) {
  RestArea.getAllRestArea(function(err, restarea) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', restarea);
      res.send({ restarea });
  });
};