const mongoose = require('mongoose');
const passLocalMong = require('passport-local-mongoose');

const schema = new mongoose.Schema(
    {
        facebookId: String,
        fullName: String
    }, {
        timestamps: true
    }
);

// adds username (and password, if any)
// social login doesn't store any password
schema.plugin(passLocalMong);

module.exports = mongoose.model('User', schema);