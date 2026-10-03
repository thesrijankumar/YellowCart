const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    cartItems: {
        type:Object,
        default:{},
    },
    verified: {
        type: Boolean,
        default: false,
    }
});

model.exports = mongoose.model("User", userSchema);