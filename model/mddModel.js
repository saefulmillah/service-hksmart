'use strict'
var sql = require('./db.js')
var ts = Math.round((new Date()).getTime() / 1000);
var Mdd = function (mdd) {
	this.admin_fee = mdd.admin_fee
    this.midware_timestamp = mdd.midware_timestamp
    this.paid_amount = mdd.unique_amount
    this.topup_amount = mdd.topup_amount
    this.unique_amount = mdd.unique_amount
    this.merchant_id = mdd.merchant_id
	this.created_at = new Date()
}

Mdd.LoginDevice = function (query, result) {

	var b = query
	var request = require("request")

	var options = { 
		method: 'POST',
	  	url: 'http://prod-app.mdd.co.id:38080/MerchantMobAppHost/v1/login',
	  	headers: { 
	  				'cache-control': 'no-cache',
	     			'Content-Type': 'application/json' 
	     		},
		body: b,
		json: true 
	}

	request(options, function (error, body) {
		  if (error) { 
		  	result(error, null)
		  } else {
		  	result(null, body)
		  }
	})
}

Mdd.doLoginMerchantGroup = function (query) {
	return new Promise(resolve => {
		var b = query
		var request = require("request")

		var options = { 
			method: 'POST',
		  	url: 'http://multipay.mdd.co.id/api/v2/login_check',
		  	headers: { 
		  				'cache-control': 'no-cache',
		     			'Content-Type': 'application/json' 
		     		},
			body: b,
			json: true 
		}

		request(options, function (error, body) {
			  if (error) { 
			  	console.log(error)
			  } else {
			  	resolve(body)
			  }
		})
	})
}

Mdd.doRegistrasiUser = async function (query, result) {
		let login = {
						username : "saeful",
						password : "123456"
					}
		var a = query
		var b = {
					first_name : a.first_name,
					last_name : a.last_name,
					fullname : a.first_name+" "+a.last_name,
					username : a.username,
					password : a.password,
					address : a.address,
					email : a.email,
					phone : a.phone
				}
		console.log(b)
		let p1 = await Mdd.doLoginMerchantGroup(login)
		var c = p1.body
		console.log(c)
		var request = require("request")
		var options = { 
				method: 'POST',
			  	url: 'http://multipay.mdd.co.id/api/v2/mobile/user/merchants/registrations',
			  	headers: { 
			     			'Content-Type': 'application/json',
			     			'Authorization': 'Bearer '+c.token
			     		},
				body: b,
				json: true 
			}

		request(options, function (error, response) {
		  	if (error) {
				console.log(error)
			} else {
				result(null, response.body)
				// Mdd.doInsertRegistered(objRegistered)
				// console.log(response.body)
				// if (response.body.code.equals(200)) {
					var objRegistered = Object.assign(b, response.body)
					Mdd.doInsertRegistered(objRegistered)
				// }
				// console.log("result request >",result.body)
			}
		})
	// console.log(p1.body)
	// console.log(options)
}

Mdd.doInsertRegistered = function (query) {
	var a = query
	var b = {
		first_name : a.first_name,
		last_name : a.last_name,
		username : a.username,
		password : a.password,
		email : a.email,
		phone : a.phone,
		sex : "L",
		birthdate : null,
		is_active : 1	,
		device_id : a.phone,
		emv_ksn : a.data.emv_ksn,
		emv_ipek : a.data.emv_ipek,
		pin_ksn : a.data.pin_ksn,
		pin_ipek : a.data.pin_ipek,
		track_ksn : a.data.track_ksn,
		track_ipek : a.data.track_ipek,
		pin_block_mk_universal : a.data.pin_block_mk_universal,
		pin_block_wk_universal : a.data.pin_block_wk_universal,
		created_at : ts,
		created_by : a.username,

	}

	var q = "INSERT INTO m_user SET ?"
	sql.query(q, b)
}

Mdd.GetAccountInfo = function (query, result) {
	var b = query
	// console.log(b)
	// return
	sql.query("SELECT * FROM m_user WHERE email = ?", b.email, function (err, res) {
		// console.log('this.sql', this.sql) //command/query
		if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
	})
}

Mdd.GetAccountInfoByUsername = function (query, result) {
	var b = query

	sql.query("SELECT * FROM m_user WHERE username = ? AND password = ?", [b.username, b.password], function (err, res) {
		if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
	})
}

Mdd.getNoInvoice = function (query) {
	return new Promise(resolve => {
		var a = query
		var q = "CALL generate_invoice()"
		sql.query(q, function (err, res) {
			if (err) {
				console.log(err)
			} else {
				resolve(res[0][0])
			}
		})
	})
}

Mdd.DoTopupInquiry = async function (query, result) {

	let invoice_num = await Mdd.getNoInvoice()

	var a = query
	var b = {
		device_id : a.device_id,
		paid_amount : a.paid_amount,
		card_issuer_id : a.card_issuer_id,
		device_timestamp : a.device_timestamp
	}

	var token = a.token
	console.log("invoice_num >", invoice_num)
	// console.log("token >", token)
	var request = require("request")

	var options = {
		method : 'POST',
		url : 'http://prod-app.mdd.co.id:38080/MerchantMobAppHost/v1/emoney_topup_switching/topup/inquiry',
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
			console.log(invoice_num)
			console.log(body.body)
			var obj_topup_inquiry= Object.assign(invoice_num, body.body)
			result(null, obj_topup_inquiry)
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
		url : 'http://prod-app.mdd.co.id:38080/MerchantMobAppHost/v1/emoney_sb/topup/unique_transfer/inquiry',
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

	// sql.query("INSERT INTO t_topup SET ?", b, function (err, res) {
	// 	if (err) 
	// 		res.send(err)
	// 		res.send(result)
	// })
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
		url : 'http://prod-app.mdd.co.id:38080/MerchantMobAppHost/v1/emoney_sb/get_account_info/balance',
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
				invoice_num : a.invoice_num,
				paid_amount : a.topup_amount,
				device_id : a.device_id,
				card_issuer_id : "3",
				track_ksn_index : a.track_ksn_index,
				pan_enc : a.pan_enc,
				pan_len : a.pan_len,
				pan_hash : a.pan_hash,
				device_timestamp : "1572431662"
			}
	var token = a.token
	var options = {
		method : "POST",
		url : "http://prod-app.mdd.co.id:38080/MerchantMobAppHost/v1/emoney_topup_switching/topup/",
		timeout: 6000,
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

Mdd.DoInsertTransaksi = function (query) {
	var a = query
	var b = {
		admin_fee: 900,
        device_timestamp: a.midware_timestamp,
        device_id : a.device_id,
        card_issuer_id : a.card_issuer_id,
        no_ue : a.no_kartu,
        paid_amount: a.unique_amount,
        topup_amount: a.topup_amount,
        merchant_id: a.merchant_id,
        created_at : ts,
		created_by : a.merchant_id,
		updated_at : ts,
		updated_by : a.merchant_id,
		status_confirm : null
	}

	// console.log("DoInsertTransaksi >", query)
	// return
	var status = 'OK' 
	console.log('status >', status)
	console.log('insert >', b)

	if (status!='ERROR') {
		sql.query("INSERT INTO t_topup set ?", b)
		// console.log('this.sql', this.sql) //command/query
	}

}

// Mdd.DoConfirmTransfer = function (query) {
// 	var a = query
// 	var b = 
// }

Mdd.DoUpdateTransaksi = function (query) {
	var a = query
	var b = {
		payment_method : a.payment_method,
		invoice_num : a.invoice_num,
		card_issuer_id : a.card_issuer_id,
		device_id : a.device_id, 
		card_issuer_id : a.card_issuer_id, 
		device_timestamp : a.device_timestamp, 
		reff_no: a.reff_no,
	    mid: a.mid,
	    pending_balance: a.pending_balance,
	    provider_id: a.provider_id,
	    message: a.message,
	    status: a.status,
	}
	console.log("DoUpdateTransaksi > ", b)
	// return
	sql.query("UPDATE t_topup SET no_invoice = ?, status_topup = ?, card_issuer_id = ?, device_id = ?, entry_mode = ?, payment_method = ?, reff_no = ?, updated_at = ? WHERE device_id = ? AND status_topup==null", [a.invoice_num, a.status, a.card_issuer_id, a.device_id, a.entry_mode, a.payment_method, a.reff_no, ts, a.device_id])
}

Mdd.getTopupHistory = function (query, result) {
	var a = query
	var q = "SELECT DATE_FORMAT(FROM_UNIXTIME(created_at),'%d %M, %Y %H:%m:%s') AS created_at, no_invoice, reff_no, paid_amount, status_confirm FROM t_topup ORDER BY id DESC LIMIT 5"
	sql.query(q, function (err, res) {
		if (err) {
			result(err, null)
		} else {
			result(null, res)
		}
	})
}

Mdd.checkTransfer = function (query, result) {
	var request = require("request")
	var a = query
	var b = {
				device_timestamp : ts.toString()
			}
	var token = a.token
	var options = {
		method : "POST",
		url : "http://prod-app.mdd.co.id:38080/MerchantMobAppHost/v1/emoney_sb/trigger_api/trigger_bca_transfer_check",
		headers : {
			'cache-control' : 'no-cache',
			'Content-Type' : 'application/json',
			Authorization : "Murdoc "+token,
			Accept : 'application/json'
		},
		body : b,
		json : true
	}
	console.log("options >", options)
	request(options, function (error, response) {
		if (error) {
			result(error, null)
		} else {
			result(null, response.body)
			console.log("response >", response.body)
		}
	})

}


module.exports = Mdd

