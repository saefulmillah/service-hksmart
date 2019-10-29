'use strict'

var Mdd = require('../../model/mddModel.js')
const crypto = require('crypto')

function hash_pass(password) {
	var hash_md5 = null
	var hash_sha256 = null

	hash_md5 = crypto.createHash('md5')
		.update(password)
		.digest('hex')

	hash_sha256 = crypto.createHash('sha256')
		.update("1571992678"+hash_md5)
		.digest('hex')

	return hash_sha256
}

/* STEP 1 -  mendapatkan account info username, password by email */
exports.login_mdd_device = function (req, res) {
	var a = req.body
	// console.log(a)
	// return
	Mdd.GetAccountInfo(a, function (err, result) {
		var a = result[0];
		var b = {
			username : a.username,
			pass_hash : hash_pass(a.password),
			device_timestamp : "1571992678"
		}
		/* STEP 2 - HIT API Login MDD dengan parameter username dan password yang didapatkan di STEP 1 */
		Mdd.LoginDevice(b, function (err, reslogin) {
			var resultLoginDevice = reslogin.body
			if (err)
		    	res.send(err)
		  		res.send({resultLoginDevice})
		  		console.log(resultLoginDevice)
		  		// res.json({resultLoginDevice})
		})
	})
}

/* STEP 3 - TOPUP INQUIRY */
exports.topup_inquiry = function (req, res) {		
	var a = req.body
	var b = a.jsonDoTopupInquiry
	var c = JSON.parse(b)
	// console.log(c)
	Mdd.DoTopupInquiry(c, function (err, result) {	
		var res_topup_inquiry = result.body
		if (err) 
			res.send(err)
			res.send({res_topup_inquiry})
			console.log(res_topup_inquiry)
	})
}
