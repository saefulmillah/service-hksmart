'use strict'

var Mdd = require('../../model/mddModel.js')
let arr_info_payment = [];
let arrInfoTopupInquiry = [];
const crypto = require('crypto')
var ts = Math.round((new Date()).getTime() / 1000);

function hash_pass(password) {
	var hash_md5 = null
	var hash_sha256 = null

	hash_md5 = crypto.createHash('md5')
		.update(password)
		.digest('hex')

	hash_sha256 = crypto.createHash('sha256')
		.update(ts+hash_md5)
		.digest('hex')

	return hash_sha256
}
/*LOGIN MERCHANT GROUP*/
exports.login_merchant_group = function (req, res) {
	var a = {
		username:"saeful",
		password:"123456"
	}
	Mdd.doLoginMerchantGroup(a, function (err, result) {
		if (err) {
			res.send(err)
		} else {
			res.send(result)
		}
	})
}
/*REGISTRASI*/
exports.registrasi_mdd_user = function (req, res) {
	var a = req.body
	var b = a.json_register
	var c = JSON.parse(b)
	console.log(c)
	// return
	Mdd.doRegistrasiUser(c, function (err, result) {
		if (err) {
			res.send(err)
			console.log("error >", err)
		} else {
			res.send({result})
			console.log("result >", result)
		}
	})
}

/* STEP 1 -  mendapatkan account info username, password by email */
exports.login_mdd_device = function (req, res) {
	var a = req.body
	// console.log(a)
	// return
	Mdd.GetAccountInfo(a, function (err, result) {
		if (result.length > 0) {
			var a = result[0];
			// console.log(a)
			// return
			var b = {
				username : a.username,
				pass_hash : hash_pass(a.password),
				device_timestamp : ts.toString()
			}
			// console.log(b)
			// return
			/* STEP 2 - HIT API Login MDD dengan parameter username dan password yang didapatkan di STEP 1 */
			Mdd.LoginDevice(b, function (err, reslogin) {
				var resultLoginDevice = reslogin.body
				if (err)
			    	res.send(err)
			  		// res.send({resultLoginDevice})
			  		var obj = Object.assign(a, resultLoginDevice);
			  		res.send({obj})
			  		console.log(obj)
			  		// console.log(result)
			  		// res.json({resultLoginDevice})
			})
		} else {
			res.send({
				code : "0000",
				status : "ERROR",
				message : "USER TIDAK ADA"
			})
		}
	})
}

exports.login = function (req, res) {
	var a = req.body
	var b = a.json_login
	var c = JSON.parse(b)
	// console.log(a)
	// console.log(b)
	// console.log(c)
	// // return
	Mdd.GetAccountInfoByUsername(c, function (err, result) {
		if (result.length > 0) {
			var a = result[0];
			var b = {
				username : a.username,
				pass_hash : hash_pass(a.password),
				device_timestamp : ts.toString()
			}
			// console.log(b)
			// return
			/* STEP 2 - HIT API Login MDD dengan parameter username dan password yang didapatkan di STEP 1 */
			Mdd.LoginDevice(b, function (err, reslogin) {
				var resultLoginDevice = reslogin.body
				if (err){
					res.send(err)
				} else {
					// res.send({resultLoginDevice})
			  		var obj = {
								code : "0001",
								status : "SUCCESS",
								message : "USER DITEMUKAN",
								data : Object.assign(a, resultLoginDevice)
							}
			  		res.send({obj})
			  		console.log(obj)
			  		// console.log(result)
			  		// res.json({resultLoginDevice})
				}
			})
		} else {
			var obj = {
				code : "0000",
				status : "ERROR",
				message : "USER TIDAK ADA",
				data : {}
			}
			res.send({obj})
		}
	})
}

/* STEP 3 - TOPUP INQUIRY EMONEY*/
/*
	{
	    "obj_detail_payment": {
	        "response_code": "0X10",
	        "admin_fee": 900,
	        "midware_timestamp": "1572596264",
	        "paid_amount": 1100,
	        "topup_amount": 25900,
	        "message": "EWALLET UNIQUE TOPUP INQUIRY FAILED.\nALREADY HAVE EXISTING INQUIRY, PROCESS THIS TOPUP FIRST.",
	        "version": {
	            "ewallet_ver": "v0.3.0",
	            "device_crypto_ver": "v0.3.0"
	        },
	        "status": "ERROR",
	        "transfer_data": {
	            "account_num": "102.000.756.3080",
	            "bank": "MANDIRI",
	            "account_name": "PT MULTIDAYA DINAMIKA"
	        },
	        "unique_amount": 26265,
	        "merchant_id": 64
	    }
	}
*/
// exports.get_serial_invoice = function (req, res) {
// 	Mdd.getNoInvoice(req, function (err, result) {
// 		if (err) {
// 			res.send(err)
// 		} else {
// 			res.send(result)
// 		}
// 	})
// }
exports.topup_inquiry = function (req, res) {		
	var a = req.body
	var b = a.jsonDoTopupInquiry
	var c = JSON.parse(b)
	console.log(c)
	// return
	Mdd.DoTopupInquiry(c, function (err, result) {	
		var res_topup_inquiry = result
		var obj = Object.assign(c, res_topup_inquiry)
		if (err) 
			res.send(err)
			res.send({res_topup_inquiry})
			console.log("res_topup_inquiry >", res_topup_inquiry)
	})
}

/* STEP 4 - TOPUP INQUIRY WALLET
	var b = {
		"topup_amount" : b.paid_amount+b.admin_fee,
		"device_timestamp" : b.device_timestamp,
		"token" : b.token
	}
 */

exports.topup_inquiry_wallet = function (req, res) {
	var a = req.body
	var b = a.jsonDoTopupInquiryWallet
	var c = JSON.parse(b)
	// console.log(c)
	// var c = a					

	Mdd.DoTopupInquiryWallet(c, function (err, result) {
		var res_topup_inquiry_wallet = result.body
		if (err) {
			res.json(err)
		} else {
			var obj_topup_wallet = Object.assign(c, res_topup_inquiry_wallet);
			console.log("obj_topup_wallet >", obj_topup_wallet)

			res.json({res_topup_inquiry_wallet})			
			Mdd.DoInsertTransaksi(obj_topup_wallet)
			console.log("res_topup_inquiry_wallet >", res_topup_inquiry_wallet)		
		}			
	})
}


/* STEP 5 - CEK STATUS TRANSFER EWALLET 
	melakukan pengecekan pembayaran, apabila pembayaran telah dilakukan dan disistem sudah diverifikasi
	maka bisa melakukan topup emoney
	pengecekan dilakukan dengan auto reload 1 menit sekali */
/* {
    "response_code": "0034",
    "midware_timestamp": "1572579197",
    "balance_amount": 38900,
    "merchant_id": 64,
    "message": "SUCCESS TO GET BALANCE AMOUNT.",
    "version": {
        "ewallet_ver": "v0.3.0",
        "device_crypto_ver": "v0.3.0"
    },
    "status": "OK"
} */
exports.cek_status_transfer = function (req, res) {
	let res_cek_saldo
	var a = req.body
	var b = {
		token : a.token,
		device_timestamp : a.device_timestamp,
	}

	// console.log(arr_info_payment[0].unique_amount)
	// return
	Mdd.DoCekSaldo(b, function (err, result) {
		var result = result.body
		let resInfoPayment
		if (err) {
			res.send(err)
		} else {
			// res.send(result)
			res_cek_saldo = result
			// console.log(res_cek_saldo)
			// return
			// if 100 <== 200
			if (arr_info_payment[0].unique_amount > res_cek_saldo.balance_amount) {
				resInfoPayment = {
									payment_message : "SALDO_KURANG",
									payment_code_status : "00",
									payment_status : "MENUNGGU_TRANSFER",
									payment_curr_saldo : res_cek_saldo.balance_amount
								}
			} else {
				resInfoPayment = {
									payment_message : "SALDO_CUKUP",
									payment_code_status : "01",
									payment_status : "SUDAH_TRANSFER",
									payment_curr_saldo : res_cek_saldo.balance_amount
								}
			}
			console.log(resInfoPayment)
			res.send(resInfoPayment)
			// console.log(result)
		}
	})


}

/*

{
	"entry_mode" : "050",
	"payment_method" : "1",
	"invoice_num" : "101",
	"paid_amount" : 1100,
	"device_id" : "081321186603",
	"card_issuer_id" : "3",
	"track_ksn_index" : "16FDB",
	"pan_enc" : "7AD53A98DE1B98BC",
	"pan_len" : 16,
	"pan_hash" : "fb849996f9c082a81a9ef7c0d2ebfee3fe3b7ff07807981367d533e964c046fb941f6f3d02a945100ffaabbb97de9d60b0f2c2d3dad5a2ec179d05bd5fdf77a2",
	"device_timestamp" : "1572431662"
}

*/

exports.topup_emoney = function (req, res) {
	var a = req.body
	var b = a.json_do_topup
	var c = JSON.parse(b)
	// var c = a

		// var c = {
		// 		  entry_mode : '050',
		// 		  payment_method : '1',
		// 		  invoice_num : '924',
		// 		  paid_amount : '25000',
		// 		  topup_amount : 2000,
		// 		  device_id : '085221946041',
		// 		  card_issuer_id : '3',
		// 		  track_ksn_index : '3E49B',
		// 		  pan_enc : 'CEBCB71B05B12556',
		// 		  pan_len : 16,
		// 		  pan_hash : '95462c3ad69f5346f475fe460747426ed36c8ff0625b9f52c32df853fece1b2b1cde68b15319ffe5cfc51ad98dc74a91884d8d3beb6d379368c26676c0193c9b',
		// 		  device_timestamp : '1572431662',
		// 		  token : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoa29wanQiLCJpc3MiOiJodHRwOi8vZGV2LWFwcC5tZGQu' 
		// 	}
		// var result = {
		//     reff_no : "MDD-572516059",
		//     response_code : "00B0",
		//     admin_fee : 900,
		//     midware_timestamp : "1572516057",
		//     paid_amount : 1100,
		//     topup_amount : 200,
		//     mid : "2ad3755bd69f70734b79bf828eeacd3a",
		//     pending_balance : "",
		//     provider_id : "",
		//     message : "TOPUP APPROVED.",
		//     status : "OK"
		// }

	Mdd.DoCekSaldo(c, function (err, result) {

		console.log('request >', c)
		// return
		var result = result.body
		
		if (err) {
			res.send(err)
		} else {
			console.log('result cek saldo >', result)
			if (c.topup_amount < result.balance_amount) {
				Mdd.DoTopup(c, function (err, result) {
					var result = result.body
					console.log('result topup >', result)
					if (err) {
						res.send(err)
					} else {
						// var obj_topup_emoney = Object.assign(c, result);
						// console.log("obj_topup_emoney >", obj_topup_emoney)
						// console.log(result.balance_amount)
						// Mdd.DoUpdateTransaksi(obj_topup_emoney)
						res.send(result)
					}
				})
			} else {
				result = {
					response_code : "0000",
					status : "FAILED",
					message : "Saldo Kurang",
					saldo : result.balance_amount
				}
				console.log("kurang saldo >", result)
				res.send(result)
			}
		}	
	})
}


exports.topup_emoney_history = function (req, res) {
	var a = req.body
	var b = a.json_get_topup_history
	var c = JSON.parse(b)
	console.log(c)
	Mdd.getTopupHistory(c, function (err, result) {
		var res_topup_history = result
		if (err) {
			res.json(err)
		} else {
			console.log(res_topup_history)
			res.json({res_topup_history})
		}
	})
}

/*
{
    "response_code": "00D0",
    "midware_timestamp": "1574136886",
    "message": "TOPUP SUCCESS.",
    "version": {
        "ewallet_ver": "v0.3.0",
        "device_crypto_ver": "v0.3.0"
    },
    "status": "OK"
}
*/

exports.konfirmasi_transfer = function (req, res) {
	var a = req.body
	var b = a.json_konf_transfer
	// var c = JSON.parse(b)
	console.log("a.json_konf_transfer >", b)
	Mdd.checkTransfer(b, function (err, result) {
		if (err) {
			res.send(err)
		} else {
			res.send(result)
			console.log(result)
		}
	})
}