const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

//User object
const userSchema = new Schema({
    userType: {
        type: String,
        required: true
    },

    userId: {
        type: Number,
        required: true,
        unique: true
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    userPassword: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', userSchema);

//Export User model to be used
module.exports = User;