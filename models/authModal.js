const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
    addressids: {
        type: []
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    emailaddress: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now // Set default value to current date/time
    },
    updatedAt: {
        type: Date,
        default: Date.now // Set default value to current date/time
    },
    otp: {
        type: String
    },
    otp_expiry: {
        type: Date,
    }
});

authSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;
