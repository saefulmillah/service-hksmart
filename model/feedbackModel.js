'use strict'
var sql = require('./db.js')
var ts = Math.round((new Date()).getTime() / 1000)
var Feedback = function (Feedback) {
	this.created_at = new Date()
}

Feedback.getListFeedback = function (result) {
	var q = "SELECT id, feedback_item, id_aspect FROM m_question_feedback ORDER BY id ASC"
	sql.query(q, function (err, res) {
		if (err) {
			result(err, null)
		} else {
			result(null, res)
		}
	})
}

Feedback.insertFeedback = function (query, result) {
	var a = query
	var q = "INSERT INTO t_feedback SET ?"
	var b = {
		id_feedback : a.id_feedback,
		id_user : a.id_user,
		id_ruas : a.id_ruas,
		answer : a.answer,
		created_at : ts,
		created_by : "admin",
		updated_at : ts,
		updated_by : "admin"
	}
	console.log("request > a", a)
	console.log("request > b", b)
	sql.query(q, b, function (err, res) {
		if (err) {
			result(err, null)
		} else {
			result(null, res)
		}
	})
}

module.exports = Feedback