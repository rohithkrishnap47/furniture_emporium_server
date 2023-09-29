const mongoose = require("moongoose")
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    categoryName:{
        type:String
    },
    categoryImages:{
        type:Array
    },
    description:{
        type:String
    }
})
const categoryModal = mongoose.model("Admin", {
    categorySchema
})
module.exports=categoryModal