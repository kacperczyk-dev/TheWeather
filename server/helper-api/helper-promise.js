const axios = require('axios');

var {Forecast} = require('./../db/models/forecast');

var getCurrentWeather = function(place){
    var encodedAddress = encodeURIComponent(place);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
    axios.get(geocodeUrl).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address.');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = 
            `https://api.darksky.net/forecast/a656f5ca91650f1c39d2a0c28b969338/${lat},${lng}?units=si&exclude=[minutely,hourly,daily,flags]`;
        return new axios.get(weatherUrl)
    }).then((response) => {
        var forecast = new Forecast({
            place: place, 
            currently: response.data.currently
        });
        forecast.save().then((doc) => {
            console.log(doc);
        });

    }).catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }
    });
};

module.exports = {
    getCurrentWeather
}