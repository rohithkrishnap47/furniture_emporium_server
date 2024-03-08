const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name: {
        type: String

    },
    username: {
        type: String

    },
    password: {
        type: String

    },
    role: {
        type: String

    },
    status: {
        type: String

    }
})


const adminModal = mongoose.model("Admin",
    adminSchema
)
module.exports = adminModal