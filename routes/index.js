var express = require('express');
var router = express.Router();
var path = require('path');
var env = require('dotenv').config();


const Client = require('pg').Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cars', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','cars.html'));
});

router.get('/carsOut', function(req, res, next) {
  // client object enables issuing SQL queries
  client.query('SELECT * FROM cars', function(err, result){
    if (err) {next(err);}
    res.json(result.rows);
    console.log(result.rows);
  });
});

router.get('/madlibs', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','madlibs.html'));
});

router.post('/madlibs', function(req, res) {
  //console.log (req.body);
  res.json({ 
    results: "If you want to become " + req.body.noun1 + " literate, here are some key " 
    + req.body.pnoun1 + " that you should " + req.body.verb1 
    + " as quickly as possible: CD ROM: Stands for compact " + req.body.noun2  
    + " ... read only " + req.body.mword + ". This compact disc can hold as many as 600 "
    +  req.body.pnoun2 + ", which is the equivalent of 700 floppy " + req.body.pnoun3 
    + ". CYBERSPACE: Stands for the imaginary " + req.body.noun3 + " that people enter when they " 
    + req.body.verb2 + " with each other through computers on a collection of " 
    + req.body.pnoun4 + " known as the Inter" + req.body.noun4 
    + ". E-Mail: Means " + req.body.adverb + " transmitted " + req.body.noun5 
    + ". MODEM: Is the device that allows an " + req.body.adjective 
    + " computer to transmit " + req.body.pnoun5 + " over a phone " + req.body.noun6 + "."
  });
});

module.exports = router;
