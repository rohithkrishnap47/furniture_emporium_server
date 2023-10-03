const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const loginSchema = new Schema({
    username: String,
    password: String,
});

const Adminlogin = mongoose.model('User', loginSchema);
module.exports = Adminlogin