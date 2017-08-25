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
    currently: {
        type: Object,
        required: true
    }
});

var Forecast = mongoose.model('Forecast', forecastSchema);

module.exports = {
    Forecast
};