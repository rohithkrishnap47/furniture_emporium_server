const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    deliveryAddress: {
        type: mongoose.Types.ObjectId,
        ref: "Address"
    },
    cartDetails: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
    paymentMethod: [{
        couponUsed: {
            type: mongoose.Types.ObjectId,
            ref: "Coupon"
        },
        status: {
            type: String,
            enum: ["Pending", "Success"],
        }

    }],
    orderedDate:{
        type:Date,
        default:Date.now()
    },
    deliveredDate:{
        type:Date,
        default:null
    },
    deliveryStatus:{
        type:String,
        enum:["Pending", "Processing", "Shipped", "Delivered"],
        default:"Pending"
    }
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order  