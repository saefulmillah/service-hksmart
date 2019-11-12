'use strict'

var Csi = require('../../model/csiModel.js')

exports.read_feedback = function(req, res) {
	var a = req.body
	Csi.get_feedback(a, function(err, result) {
	console.log('controller')
	if (err)
	  res.send(err)
	  console.log('res', result)
	  res.send({ result })
	})
}

exports.read_rating = function(req, res) {
 	var a = req.body
	Csi.get_rating(a, function(err, result) {
	console.log('controller')
	if (err)
	  res.send(err)
	  console.log('res', result)
	  res.send({ result })
	})
}