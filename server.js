const express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
	port = process.env.PORT || 6666;
// cors
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host     : '119.252.164.226',
    user     : 'root',
    password : 'P@ssw0rd',
    database : 'hksmart'
});
 
// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes'); //importing route
routes(app); //register the route
