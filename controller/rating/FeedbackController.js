'use strict'

var Explore = require('../../model/feedbackModel.js')

exports.get_list_feedback = function (req, res) {
	Explore.getListFeedback(function (err, result) {
		if (err) {
			res.json(err)
		} else {
			console.log(result)
			res.json({result})
		}
	})
}