const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: {
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    isEmailverified:{
        type:Boolean,
        required:true
    },
    userToken:{
        type:String,
        // required
    }
})
const User = mongoose.model("User", userSchema);
module.exports = User