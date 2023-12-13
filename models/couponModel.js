const mongoose = require("mongoose")
const couponSchema = new mongoose.Schema({

    name: String,
    couponcode: String,
    discount: Number,
    startingDate: Date,
    endingDate: Date,
    active: {
        type:Boolean,
        default:true,
    }
})
const couponmodal =mongoose.modal("Coupon",couponSchema)
module.exports=couponmodal;