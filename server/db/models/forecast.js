const {mongoose} = require('./../mongoose-config');
const {Schema} = require('mongoose');

var forecastSchema = new Schema({
    place: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    precipProbability:  {
        type: Number,
        required: false
    },
    temperature: {
        type: Number,
        required: false
    },
    apparentTemperature: {
        type: Number,
        required: false
    },
    humidity: {
        type: Number,
        required: false
    },
    windSpeed: {
        type: Number,
        required: false
    },
    cloudCover: {
        type: Number,
        required: false
    },
    pressure: {
        type: Number,
        required: false
    },
    ozone: {
        type: Number,
        required: false
    },
    uvIndex: {
        type: Number,
        required: false
    },
    daily: {
        type: Object,
        required: false
    },
    hourly: {
        type: Object,
        required: false
    }
});

var Forecast = mongoose.model('Forecast', forecastSchema);

module.exports = Forecast;