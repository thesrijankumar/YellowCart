const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
    }, 
    productName: {
        type: String,
        required: true,
    }, 
    productDesc: {
        type: String,
        default: ""
    },
    image: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    offeredPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }, 
    isAvail: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true })

module.exports = mongoose.models("Product", productSchema);