const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true,                // this will ensure that email value is unique and is not repeated any where else
        validate: {
            validator: validator.isEmail,      // validator: (value) => validator.isEmail; is also correct
            message: '{VALUE} is not valid'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// overriding toJSON method to limit the data
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();      // takes the user variable and converts it into user objects

    return _.pick(userObject, ['_id','email']);  // only displays the id and email property from user object in the response
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;    // reffers to the user document in DB
    var access = 'auth';

    // takes unique id of individual user(from db) and access var as the data of sign method
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'secretKey').toString();  
    user.tokens = user.tokens.concat([{access, token}]);
    
    return user.save().then(() => {      // this return call is same as chaining the 2nd then call, in other words user.save returns a promise which returns the toekn
        return token;                // token is returned so that it could be verified in server to authenticate the user
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = { User };
