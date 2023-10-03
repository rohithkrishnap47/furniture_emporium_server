const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    bannerId: {
        type: String,
        // required: true,
        // unique: true
    },
    bannerImage: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    bannerTitle: {
        type: String
    }
})
const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner