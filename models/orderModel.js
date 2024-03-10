const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: String,
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
    },
    product: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }],
    deliveryAddress: {
        type: mongoose.Types.ObjectId,
        ref: "Address"
    },
    cartDetails: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
    PaymentMethod: {
        type: String,
        enum: ["COD", "ONLINE", "checkoutPaymentPaypal"]
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Success"],
        default: "Pending"
    },
    totalAmount: {
        type: Number
    },
    couponUsed: {
        type: mongoose.Types.ObjectId,
        ref: "Coupon"
    },
    orderedDate: {
        type: Date,
        default: Date.now
    },
    isCancelled: {
        type: Boolean
    },
    deliveredDate: {
        type: Date
    },
    deliveryStatus: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    }
});

orderSchema.pre('save', function (next) {
    if (!this.deliveredDate) {
        this.deliveredDate = moment(this.orderedDate).add(1, 'day').toDate();
    }
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
