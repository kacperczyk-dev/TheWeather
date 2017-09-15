const http = require('http');
const _ = require('lodash');
const express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var path = require('path');
var {mongoose} = require('./db/mongoose-config');
var helper = require('./helper-api/helper-promise');

// Routes
const weatherRoutes = require('./routes/weather');
const authRoutes = require('./routes/auth');
const placeRoutes = require('./routes/place');

var app = express();
var port = process.env.PORT || 3000;

// Parsers
app.use(bodyParser.json());

// Cors for development purposes
// var corsOptions = {
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     exposedHeaders: "x-auth"
// }
// app.use(cors(corsOptions));

// Angular front out_dir
app.use(express.static(path.join(__dirname, 'public')));

// Forward all /weather requests to ./routes/weather
app.use('/weather', weatherRoutes);

// Forward all /place requests to ./routes/place
app.use('/place', placeRoutes);

// Login and Register
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// When app is started start fetching data from API each 30min
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
    //keep the app awake
    setInterval(function(){
        http.get('http://the-weather-heroku.herokuapp.com/');
    }, 300000);

    //get updated weather infor every 30min
    setInterval(function(){
        helper.getWeather();
    }, 900000);
});