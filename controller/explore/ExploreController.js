'use strict'

var Explore = require('../../model/exploreModel.js')

exports.explore_near = function (req, res) {
	var a = req.body
	var b = a.json_explore
	var c = JSON.parse(b)
	console.log(c)
	Explore.getExploreNear(c, function (err, result) {
		if (err) {
			res.json(err)
		} else {
			console.log(result)
			res.json({result})
		}
	})
}