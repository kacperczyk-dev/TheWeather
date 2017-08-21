require ('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose-config');
var helper = require('./helper-api/helper-promise');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Start defining routes for API


// End 

app.listen(port, () => {
    setInterval(function(){
        helper.getWeather('Wroclaw');
    }, 5000);
});