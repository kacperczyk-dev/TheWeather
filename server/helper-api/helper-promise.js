const axios = require('axios');

var getWeather = function(address){
    var encodedAddress = encodeURIComponent(address);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
    axios.get(geocodeUrl).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address.');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/a656f5ca91650f1c39d2a0c28b969338/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return new axios.get(weatherUrl)
    }).then((response) => {
        var temp = Math.round(((response.data.currently.temperature - 32) / 1.8) * 100) / 100;
        var aTemp = Math.round(((response.data.currently.apparentTemperature - 32) / 1.8) * 100) / 100;
        console.log(`It's currently ${temp} degrees but it feels like ${aTemp} degrees`);
    }).catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }
    });
};

module.exports = {
    getWeather
}