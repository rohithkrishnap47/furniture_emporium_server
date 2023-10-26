const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isEmailverified: {
        type: Boolean,
        required: true,
        default: true
    },
    userStatus: {
        type: Boolean,
        default: true,
    },
    userToken: {
        type: String,
    },
    coins: {
        type: Number,
        default: 0
    }
})
const User = mongoose.model("User", userSchema);
module.exports = User