const Order = require('../../models/orderModel');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { customerId, product, deliveryAddress, cartDetails, paymentMethod } = req.body;

        const newOrder = new Order({
            customerId,
            product,
            deliveryAddress,
            cartDetails,
            paymentMethod,
        });

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
        const { orderId } = req.params;
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