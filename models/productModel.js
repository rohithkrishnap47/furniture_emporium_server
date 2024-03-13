const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        // required: true
    },
    description: {
        type: String,
    },
    warranty: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    selling_price: {
        type: Number,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
