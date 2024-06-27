const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//User object
const userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },

    userType: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    userEmail: {
        type: String,
        required: true,
        unique: true
    },

    userPassword: {
        type: String,
        required: true
    }
});

userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

const User = mongoose.model('user', userSchema);

//Export User model to be used
module.exports = User;