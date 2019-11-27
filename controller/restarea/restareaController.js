'use strict'

var RestArea = require('../../model/restareaModel.js')
var shape = require('shape-json')

exports.list_all_restarea = function(req, res) {
  RestArea.getAllRestArea(function(err, restarea) {
    if (err)
      res.send(err)
      res.send({ restarea })
  })
}

exports.get_restarea_id = function (req, res) {
	var id = req.params.restareaId
	// console.log(req.params.restareaId)
	// return
	RestArea.getRestAreaId (id, function (err, result) {
		if (err) {
			res.send(err)
		} else {
			//res.send({result})
			var scheme = {
			  "$group[restarea_detail](ID_REST_AREA)": {
			    "id": "ID_REST_AREA",
			    "REST_AREA_NAME" : "REST_AREA_NAME",
			    "REST_AREA_LATITUDE" : "REST_AREA_LATITUDE",
			    "REST_AREA_LONGITUDE" : "REST_AREA_LONGITUDE",
			    "REST_AREA_IMAGE": "REST_AREA_IMAGE",
			    "$group[facilities](ID_FACILITY)": {
			      "id": "ID_FACILITY",
			      "FACILITY_NAME": "FACILITY_NAME",
			      "$group[facilities_detail](ID_FACILITY_DETAIL)" : {
			      	"ID_FACILITY_DETAIL" : "ID_FACILITY_DETAIL",
			      	"FACILITY_DETAIL_NAME" : "FACILITY_DETAIL_NAME"
			      }
			    }
			  }
			}
			res.json(shape.parse(result, scheme))
		}
	})
}