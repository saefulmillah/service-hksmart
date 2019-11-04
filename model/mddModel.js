'user strict'
var sql = require('./db.js')

var Mdd = function (mdd) {
	this.created_at = new Date()
}

Mdd.LoginDevice = function (query, result) {

	var b = query
	var request = require("request")

	var options = { method: 'POST',
	  url: 'http://dev-app.mdd.co.id:58080/MerchantMobAppHost/v1/login',
	  headers: 
	   { 'cache-control': 'no-cache',
	     'Content-Type': 'application/json' },
	  body: b,
	  json: true }

	request(options, function (error, body) {
		  if (error) { 
		  	result(error, null)
		  } else {
		  	result(null, body)
		  }
	})
}

Mdd.GetAccountInfo = function (query, result) {
	var b = query

	sql.query("SELECT * FROM m_user WHERE email = ?", b.email, function (err, res) {
		if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
	})
}

Mdd.DoTopupInquiry = function (query, result) {
	var a = query
	var b = {
		device_id : a.device_id,
		paid_amount : a.paid_amount,
		card_issuer_id : a.card_issuer_id,
		device_timestamp : a.device_timestamp
	}

	var token = a.token
	// console.log("body >", b)
	// console.log("token >", token)
	var request = require("request")

	var options = {
		method : 'POST',
		url : 'http://dev-app.mdd.co.id:58080/MerchantMobAppHost/v1/emoney_topup_switching/topup/inquiry',
		headers : {
			'cache-control' : 'no-cache',
			'Content-Type' : 'application/json',
			Authorization : token,
			Accept : 'application/json'			
		}, 
		body : b,
		json : true
	}

	request(options, function (error, body) {
		if (error) {
			result(error, null)
		} else {
			result(null, body)
		}
	})

}

Mdd.DoTopupInquiryWallet = function (query, result) {
	var a = query
	var b = {
		topup_amount : a.topup_amount,
		device_timestamp : a.device_timestamp
	}

	var token = a.token

	var request = require("request")

	var options = {
		method : 'POST',
		url : 'http://dev-app.mdd.co.id:58080/MerchantMobAppHost/v1/emoney_sb/topup/unique_transfer/inquiry',
		headers : {
			'cache-control' : 'no-cache',
			'Content-Type' : 'application/json',
			Authorization : token,
			Accept : 'application/json'			
		}, 
		body : b,
		json : true
	}

	request(options, function (error, body) {
		if (error) {
			result(error, null)
		} else {
			result(null, body)
		}
	})
}

Mdd.DoCekSaldo = function (query, result) {
	var a = query
	var b = {
		device_timestamp : a.device_timestamp
	}

	var token = a.token

	var request = require("request")

	var options = {
		method : 'POST',
		url : 'http://dev-app.mdd.co.id:58080/MerchantMobAppHost/v1/emoney_sb/get_account_info/balance',
		headers : {
			'cache-control' : 'no-cache',
			'Content-Type' : 'application/json',
			Authorization : token,
			Accept : 'application/json'			
		}, 
		body : b,
		json : true
	}

	request(options, function (error, body) {
		if (error) {
			result(error, null)
		} else {
			result(null, body)
		}
	})
}

Mdd.DoTopup = function (query, result) {
	var request = require("request")
	var a = query
	var b = {
				entry_mode : "050",
				payment_method : "1",
				invoice_num : "101",
				paid_amount : 1100,
				device_id : "081321186603",
				card_issuer_id : "3",
				track_ksn_index : "16FDB",
				pan_enc : a.pan_enc,
				pan_len : a.pan_len,
				pan_hash : a.pan_hash,
				device_timestamp : "1572431662"
			}
	var token = a.token
	var options = {
		method : "POST",
		url : "http://dev-app.mdd.co.id:58080/MerchantMobAppHost/v1/emoney_topup_switching/topup/",
		headers : {
			'cache-control' : 'no-cache',
			'Content-Type' : 'application/json',
			Authorization : token,
			Accept : 'application/json'
		},
		body : b,
		json : true
	}

	request(options, function (error, body) {
		if (error) 
			result(error, null)
			result(null, body)
	})
}

module.exports = Mdd

