const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({

    userid: {
        type:String
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
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    otp: {
        type: String
    },
    otp_expiry: {
        type: Date,
    }
})

// Super-Admin-login-setup-----------------------------------------
// const superAdminSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });


// const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
// ----------------------------------------------------------------
const Auth = mongoose.model("Auth", authSchema);
module.exports =  Auth
// module.exports =  SuperAdmin 