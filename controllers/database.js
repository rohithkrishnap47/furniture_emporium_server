const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/furniture_emporium")
.then(() => {
    console.log("Connected to Database")
})
.catch(() => {
    console.log("Failed to connect to database , Try again !")
})  

const User=mongoose.model("User",{
    firstname:String,
    lastname:String,
    email:String,
    phone:Number,
    confirm_password:String,
    password:String,
})
const Category=mongoose.model("Category",{
    categoryName:String,
    categoryImages:Array,
    description:String,
    
})
// const Product=mongoose.model("Product",{
//     name:String,
//     category:String,
//     type:String,
//     images:Array,
//     description:String,
//     warranty:String,
//     price:Number
// })

const Admin=mongoose.model("Admin",{
    name:String,
    username:String,
    password:String,
    role:String,
    status:String
})

// -----------------------------------
module.exports = {
    Admin,
    User,
    // Product,
    Category
};  