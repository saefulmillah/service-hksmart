'use strict'

var Csi = require('../../model/csiModel.js')
var shape = require('shape-json')

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

exports.read_csi = function (req, res) {
	var a = req.body
	Csi.get_csi(a, function (err, result) {
		// console.log("")
		if (err) {
			res.send(err)
		} else {
			// res.send(result)
			var scheme = {
			  "$group[result](id_aspect_detail)": {
			    "id": "id_aspect_detail",
			    "aspect" : "aspect",
			    "aspect_classification" : "aspect_classification",
			    "aspect_item": "aspect_item",
			    "$group[scoring](id_scoring)": {
			      "id": "id_scoring",
			      "score": "score",
			      "scoring_status" : "scoring_status",
			      "created_at" : "created_at",
			      "created_by" : "created_by"
			    }
			  }
			}
			res.json(shape.parse(result, scheme))
		}
			// console.log(result)
	})
}