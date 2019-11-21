'use strict'
var sql = require('./db.js')
var InfoMudik = function (InfoMudik) {
	this.created_at = new Date()
}

InfoMudik.getListInfoMudik = function (result) {
	var q = "SELECT b.BRANCH_NAME, d.branch_length, d.branch_phone, d.branch_wa, d.branch_address, d.branch_desc, d.branch_map, d.branch_lat, d.branch_lon FROM ms_branch b INNER JOIN ms_branch_detail d ON b.ID = d.branch_id"
	sql.query(q, function (err, res) {
		if (err) {
			result(err, null)
		} else {
			result(null, res)
		}
	})
}

module.exports = InfoMudik