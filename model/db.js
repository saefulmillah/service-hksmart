'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : '192.168.66.8',
    user     : 'root',
    password : 'P@ssw0rd',
    database : 'hksmart'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;