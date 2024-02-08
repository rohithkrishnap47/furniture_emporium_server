const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  Super-Admin-login-setup-----------------------------------------
const superAdminSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
module.exports = SuperAdmin;