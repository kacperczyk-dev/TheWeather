const axios = require('axios');

var Forecast = require('./../db/models/forecast');

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
            `https://api.darksky.net/forecast/a656f5ca91650f1c39d2a0c28b969338/${lat},${lng}?units=si&exclude=[minutely,flags]`;
        return new axios.get(weatherUrl)
    }).then((response) => {
        var forecast = new Forecast({
            place: place, 
            time: response.data.currently.time,
            timeZone: response.data.timezone,
            summary: response.data.currently.summary,
            icon:  response.data.currently.icon,
            precipProbability:  response.data.currently.precipProbability,
            temperature:  response.data.currently.temperature,
            apparentTemperature:  response.data.currently.apparentTemperature,
            humidity: response.data.currently.humidity,
            windSpeed: response.data.currently.windSpeed,
            cloudCover: response.data.currently.cloudCover,
            pressure: response.data.currently.pressure,
            ozone: response.data.currently.ozone,
            uvIndex: response.data.currently.uvIndex,
            daily: response.data.daily,
            hourly: response.data.hourly
        });
        forecast.save().then((doc) => {
            console.log(`${place} saved`);
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
};