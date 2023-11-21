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
    },
    clickType: {
        type: String,
        enum: ["product", "category"], // Enum for allowed values
        required: true,
      },
      relatedItemId: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        refPath: "clickType", // Dynamic reference to 'Product' or 'Category' model
        required: true,
      },
})
const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner