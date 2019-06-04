'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var config = require('./config/config');
const { Pool, Client } = require('pg');
// use morgan to log requests to the console
app.use(morgan('dev'));
// acces control allow origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// config bdd
const connectionString = 'postgresql://postgres:*D@k@r2018*@m0946.contaboserver.net:5432/sama_pep';
const client = new Client({
  connectionString: connectionString,
});
client.connect();


const regions = require('./routes/regions')(app, client);
const departements = require('./routes/departements')(app, client);
const communes = require('./routes/communes')(app, client);
const distanceMatrix = require('./routes/distanceMatrix')(app, client);
const demandes = require('./routes/demandes')(app, client);
const payments = require('./routes/payment')(app, client);



app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + config.port + '/api');
});


var server = app.listen(config.port, function () {
  console.log('Server running at http://127.0.0.1:'+config.port+'/');
});
