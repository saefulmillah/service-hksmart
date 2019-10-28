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

module.exports = Mdd

