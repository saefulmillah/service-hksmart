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
	console.log(b)
	console.log(token)

	return
	var request = require("request")

	var options = {
		method : 'POST',
		url : '',
		headers : {
			'cache-control' : 'no-cache',
			'Content-Type' : 'application/json',
			Authorization : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYWx3YSIsImlzcyI6Imh0dHA6Ly9kZXYtYXBwLm1kZC5jby5pZDo1ODA4MC9NZXJjaGFudE1vYkFwcEhvc3QvdjEvbG9naW4iLCJpYXQiOjE1NzE5OTI3MDIsImV4cCI6MTU3OTk0MTUwMn0.4qUF89WgKFYq3HIBGYr2qBz550K41JrfbfKeS3HiCMuf1R3Kp1tXcP6oigtq4nuxE0N1ikEz-_TvzHiRsJkufg',
			Accept : 'application/json'			
		}, 
		body : {
			device_id: '085212169918',
		     paid_amount: 1100,
		     card_issuer_id: '3',
		     device_timestamp: '1571992509'
		 },
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

module.exports = Mdd

