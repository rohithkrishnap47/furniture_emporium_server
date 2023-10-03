const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    categoryName: {
        type: String
    },
    categoryImages: {
        type: Array
    },
    description: {
        type: String
    }
})
const categoryModal = mongoose.model("Category",
    categorySchema
)
module.exports = categoryModal