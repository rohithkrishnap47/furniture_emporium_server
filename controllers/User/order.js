const Order = require('../../models/orderModel');
const Cart = require('../../models/cartModels');
const razorpayInstance = require('../../services/razorpayService');
const mongoose = require('mongoose');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
// const verifyUser  = require('../middlewares/verifyUser');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const customerId = mongoose.Types.ObjectId(req.user._id)

        const { product, deliveryAddress, couponUsed ,PaymentMethod} = req.body;
        const cartDetails = await Cart.findOne({ customer: customerId }).populate("products.productId");
        console.log("cartDetails:",cartDetails);
        console.log("PaymentMethod:",PaymentMethod);
        const newOrder = new Order({
            customerId,
            product,
            deliveryAddress,
            cartDetails,
            PaymentMethod,
            couponUsed,
        });
        console.log("newOrder------:",newOrder);
        // cart total calculations
        const cartTotalQuantity = cartDetails.products?.reduce((prev, curr) => prev + curr.quantity, 0)
        const cartTotalPrice = cartDetails.products?.reduce((prev, curr) => prev + (curr.productId.price * curr.quantity), 0)
        const cartTotalDiscount = cartDetails.products?.reduce((prev, curr) => prev + (curr.productId.discount * curr.quantity), 0)
        var grandTotal = cartTotalPrice - cartTotalDiscount + 40;

        const razorpayOrder = await
            razorpayInstance().orders.create({
                amount: grandTotal * 100, currency: "INR", receipt: "", notes: {
                    "description": "Best Course for SDE placements",
                    "language": "Available in 4 major Languages JAVA, C/C++, Python, Javascript",
                    "access": "This course have Lifetime Access"
                }
            },

            )
        if (razorpayOrder) {
            newOrder["orderId"] = razorpayOrder.id
        }

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId product deliveryAddress cartDetails PaymentMethod.couponUsed');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get USER orders
exports.getuserOrder = async (req, res) => {
    try {
        const userID = mongoose.Types.ObjectId(req.user._id)
        const orders = await Order.find({customerId:userID}).populate('customerId product deliveryAddress cartDetails PaymentMethod.couponUsed');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        console.log("hellooooo");
        const orderId = req.params.id;
        const { deliveryStatus, deliveredDate } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { deliveryStatus, deliveredDate },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// VERIFY-ORDER

exports.verifyOrder = async (req, res) => {

    // STEP 7: Receive Payment Data 
    const { order_id, payment_id } = req.body;
    const razorpay_signature = req.headers['x-razorpay-signature'];

    // Pass yours key_secret here 
    const key_secret = RAZORPAY_KEY_SECRET;

    // STEP 8: Verification & Send Response to User 

    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret);

    // Passing the data to be hashed 
    hmac.update(order_id + "|" + payment_id);

    // Creating the hmac in the required format 
    const generated_signature = hmac.digest('hex');


    if (razorpay_signature === generated_signature) {
        res.json({ success: true, message: "Payment has been verified" })
    }
    else
        res.json({ success: false, message: "Payment verification failed" })
};


// CANCEL-ORDER
exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if the order has already been delivered
        if (order.deliveryStatus === 'Delivered') {
            return res.status(400).json({ error: 'Cannot cancel a delivered order' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { deliveryStatus: 'Cancelled' },
            { new: true }
        );

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// ================================================================
