const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    pincode: {
        type: Number,
    }
});

module.exports = new mongoose.model('Author', authorSchema);