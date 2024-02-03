const Order = require('../../models/orderModel');
const Cart = require('../../models/cartModels');
const razorpayInstance = require('../../services/razorpayService');
const mongoose = require('mongoose');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const userID = mongoose.Types.ObjectId(req.user._id)

        const { product, deliveryAddress, paymentMethod } = req.body;
        const cartDetails = await Cart.findOne({ customer: userID })
        console.log(cartDetails);
        const newOrder = new Order({
            userID,
            product,
            deliveryAddress,
            cartDetails,
            paymentMethod,
        });
        const razorpayOrder = await
            razorpayInstance().orders.create({
                amount: 100, currency: "INR", receipt: "", notes: {
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

        // if (reqBody.paymentMode === "ONLINE") {
        //     const razorPayOptions = {
        //         amount: grandTotal * 100,
        //         currency: "INR",
        //         receipt: orderData.orderId,
        //     };
        //     const razorPayOrder = await razorpayInstance().orders.create(
        //         razorPayOptions
        //     );
        //     orderData["razorpayOrderId"] = razorPayOrder.id;
        //     responsePayload = {
        //         ...responsePayload,
        //         key: process.env.RAZORPAY_KEY_ID,
        //         amount: razorPayOrder.amount,
        //         currency: razorPayOrder.currency,
        //         name: "LAMBDA GAMING",
        //         order_id: razorPayOrder.id,
        //         prefill: {
        //             name: reqBody.fullname,
        //             contact: reqBody.mobile,
        //             email: userEmail,
        //         },
        //         notes: {
        //             orderId: orderData.orderId,
        //         },
        //     };
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId product deliveryAddress cartDetails paymentMethod.couponUsed');
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

// 

// Cancel an order
exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find the order by ID
        const order = await Order.findById(orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if the order has already been delivered
        if (order.deliveryStatus === 'Delivered') {
            return res.status(400).json({ error: 'Cannot cancel a delivered order' });
        }

        // Update order status to 'Cancelled'
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
