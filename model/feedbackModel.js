'use strict'
var sql = require('./db.js')
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

module.exports = Feedback