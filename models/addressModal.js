const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    // newlyadded----------------------------
    contactNumber:{
        type:Number
    },
    // --------------------------------------
    password: {
        type: Number,
        // required: true,
    },
    isEmailverified: {
        type: Boolean,
        // required: true,
        // default: true
    },
    userStatus: {
        type: Boolean,
        // default: true,
    },
    userToken: {
        type: String,
    },
    coins: {
        type: Number,
        default: 0
    }
})
const Address = mongoose.model("Address", addressSchema);
module.exports = Address