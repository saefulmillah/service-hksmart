'use strict'
var sql = require('./db.js')
var Explore = function (explore) {
	this.created_at = new Date()
}

Explore.getExploreNear = function (query, result) {
	var a = query
	var q = "SELECT d.id, d.place_detail_name, d.place_detail_lat, d.place_detail_lon, d.place_detail_address, d.place_detail_remarks, d.place_detail_image, p.place_code, p.place_name FROM `m_place_detail` d INNER JOIN m_place p ON d.place_id=p.id WHERE d.place_id = ?"
	sql.query(q, [a.place_id], function (err, res) {
		if (err) {
			result(err, null)
		} else {
			result(null, res)
		}
	})
}

module.exports = Explore