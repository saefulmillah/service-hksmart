'use strict'

var Mdd = require('../../model/mddModel.js')
let arrInfoPayment = [];
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

/* STEP 1 -  mendapatkan account info username, password by email */
exports.login_mdd_device = function (req, res) {
	var a = req.body
	Mdd.GetAccountInfo(a, function (err, result) {
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
			if (err)
		    	res.send(err)
		  		// res.send({resultLoginDevice})
		  		var obj = Object.assign(a, resultLoginDevice);
		  		res.send({obj})
		  		console.log(obj)
		  		// console.log(result)
		  		// res.json({resultLoginDevice})
		})
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
exports.topup_inquiry = function (req, res) {		
	var a = req.body
	var b = a.jsonDoTopupInquiry
	var c = JSON.parse(b)
	// console.log(c)
	// return
	Mdd.DoTopupInquiry(c, function (err, result) {	
		var res_topup_inquiry = result.body
		var obj = Object.assign(b, res_topup_inquiry)
		// console.log(b)
		if (err) 
			res.send(err)
			res.send({res_topup_inquiry})
	})
}

/* STEP 4 - TOPUP INQUIRY WALLET */
exports.topup_inquiry_wallet = function (req, res) {
	var a = req.body
	var b = a.jsonDoTopupInquiryWallet
	var c = JSON.parse(b)
	// var b = {
	// 	"topup_amount" : b.paid_amount+b.admin_fee,
	// 	"device_timestamp" : b.device_timestamp,
	// 	"token" : b.token
	// }
	// console.log(b)
	// console.log(arrInfoTopupInquiry)
	// return

	Mdd.DoTopupInquiryWallet(c, function (err, result) {
		var res_topup_inquiry_wallet = result.body
		// return
		if (err) 
			res.send(err)
			res.send({res_topup_inquiry_wallet})
			console.log(res_topup_inquiry_wallet)
			arrInfoPayment.push(res_topup_inquiry_wallet)
			// return result
			// console.log(result)
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

	// console.log(arrInfoPayment[0].unique_amount)
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
			if (arrInfoPayment[0].unique_amount > res_cek_saldo.balance_amount) {
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

	Mdd.DoTopup(c, function (err, result) {
				var result = result.body
				console.log('result topup >', result)
				if (err) {
					res.send(err)
				} else {
					res.send(result)
				}
			})
	// return

	// Mdd.DoCekSaldo(c, function (err, result) {

	// 	// console.log('request >', b)
	// 	// return
	// 	var result = result.body
		
	// 	if (err)
	// 	res.send(err)
	// 	console.log(result)
	// 	// return

		
	// 		{
	// 		    "reff_no": "MDD-572516059",
	// 		    "response_code": "00B0",
	// 		    "admin_fee": 900,
	// 		    "midware_timestamp": "1572516057",
	// 		    "paid_amount": 1100,
	// 		    "topup_amount": 200,
	// 		    "mid": "2ad3755bd69f70734b79bf828eeacd3a",
	// 		    "pending_balance": "",
	// 		    "provider_id": "",
	// 		    "message": "TOPUP APPROVED.",
	// 		    "version": {
	// 		        "emoney_ts_ver": "v0.3.0",
	// 		        "device_crypto_ver": "v0.3.0"
	// 		    },
	// 		    "status": "OK"
	// 		}
		
	// 	// console.log(result.balance_amount)
	// 	if (24000 < result.balance_amount) {

	// 		// console.log('balance amount > ', result.balance_amount)
	// 		// return
	// 		// Mdd.DoTopup(c, function (err, result) {
	// 		// 	var result = result.body
	// 		// 	console.log('result topup >', result)
	// 		// 	if (err) {
	// 		// 		res.send(err)
	// 		// 	} else {
	// 		// 		res.send(result)
	// 		// 	}
	// 		// })
	// 	}
	// })
}
