const {mongoose, Schema} = require('mongoose');

var placeSchema = new Schema({
    name: {
        type: String,
        required,
        minlength: 2
    }
});

var Place = mongoose.model('Place', placeSchema);

module.exports = {
    Place
};