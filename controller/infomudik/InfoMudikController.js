'use strict'

var Explore = require('../../model/infomudikModel.js')

exports.get_list_info_mudik = function (req, res) {
	Explore.getListInfoMudik(function (err, result) {
		if (err) {
			res.json(err)
		} else {
			console.log(result)
			res.json(result)
		}
	})
}