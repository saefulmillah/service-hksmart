'user strict'

var mysql = require('mysql')

//local mysql db connection
var connection = mysql.createConnection({
    host     : '119.252.164.226',
    user     : 'root',
    password : 'P@ssw0rd',
    database : 'hksmart'
})

connection.connect(function(err) {
    if (err) 
    	console.log(err)
})

module.exports = connection