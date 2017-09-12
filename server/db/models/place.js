const {mongoose} = require('./../mongoose-config');
const {Schema} = require('mongoose');

var placeSchema = new Schema({
    city: {
        type: String,
        required: true,
        minlength: 2
    }
});

var Place = mongoose.model('Place', placeSchema);

module.exports = Place;