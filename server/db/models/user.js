const {mongoose} = require('./../mongoose-config');
const {Schema} = require('mongoose');


var userSchema = new Schema({ 
    fullName: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;