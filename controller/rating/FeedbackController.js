'use strict'

var Feedback = require('../../model/feedbackModel.js')

exports.get_list_feedback = function (req, res) {
	Feedback.getListFeedback(function (err, result) {
		if (err) {
			res.json(err)
		} else {
			console.log(result)
			res.json({result})
		}
	})
}

exports.insert_feedback = function (req, res) {
	var a = req.body
	var b = a.json_feedback
	var c = JSON.parse(b)
	console.log("request >", c)
	Feedback.insertFeedback(c, function (err, result) {
		if (err) {
			res.json(err)
		} else {
			res.json(result)
			console.log("result >", result)
		}
	})
}