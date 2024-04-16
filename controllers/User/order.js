const Order = require('../../models/orderModel');
const Cart = require('../../models/cartModels');
const razorpayInstance = require('../../services/razorpayService');
const mongoose = require('mongoose');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
// const verifyUser  = require('../middlewares/verifyUser');

// order-for pie chart

exports.generatePaymentMethodPieGraph = async (req, res) => {
    try {
        const paymentMethodCounts = await Order.aggregate([
            {
                $group: {
                    _id: "$PaymentMethod",
                    count: { $sum: 1 }
                }
            }
        ]);

        const data = paymentMethodCounts.map(method => ({
            label: method._id,
            value: method.count
        }));

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// order-for-chart.js
exports.getTotalAmountByMonth = async (req, res) => {
    try {
        const orders = await Order.find({});

        const monthlyTotal = {};
        orders.forEach(order => {
            const orderedDate = new Date(order.orderedDate);
            const monthYear = `${orderedDate.getFullYear()}-${orderedDate.getMonth() + 1}`;


            if (!monthlyTotal[monthYear]) {
                monthlyTotal[monthYear] = 0;
            }
            monthlyTotal[monthYear] += order.totalAmount;
        });

        // Prepare data for Chart.js
        const labels = Object.keys(monthlyTotal); // Months
        const data = Object.values(monthlyTotal); // Total amount spent

        res.status(200).json({ labels, data }); // Return data for Chart.js
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const customerId = mongoose.Types.ObjectId(req.user._id)

        const { product, deliveryAddress, couponUsed, PaymentMethod } = req.body;
        const cartDetails = await Cart.findOne({ customer: customerId }).populate("products.productId");
        console.log("cartDetails:", cartDetails);
        console.log("PaymentMethod:", PaymentMethod);


        // cart total calculations
        const cartTotalQuantity = cartDetails.products?.reduce((prev, curr) => prev + curr.quantity, 0)
        const cartTotalPrice = cartDetails.products?.reduce((prev, curr) => prev + (curr.productId.price * curr.quantity), 0)
        const cartTotalDiscount = cartDetails.products?.reduce((prev, curr) => prev + (curr.productId.discount * curr.quantity), 0)
        var grandTotal = cartTotalPrice - cartTotalDiscount + 40;
        const newOrder = new Order({
            customerId,
            product,
            deliveryAddress,
            cartDetails,
            PaymentMethod,
            couponUsed,
            totalAmount: grandTotal
        });
        console.log("newOrder------:", newOrder);
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
        const deletedDocument = await Cart.findOneAndDelete({ customer: customerId });

        if (!deletedDocument) {
            console.log({ message: 'Document not found' });
        }

        console.log({ message: 'Document deleted successfully', deletedDocument });
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
        const orders = await Order.find({ customerId: userID }).populate('customerId product deliveryAddress cartDetails PaymentMethod.couponUsed');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get last order for invoice

exports.getorderbyId = async (req, res) => {
    try {
        const orderid = mongoose.Types.ObjectId(req.params.orderId)
        const order = await Order.findOne({ _id: orderid }).populate("product deliveryAddress")

        if (!order) {
            res.status(404).json({ error: 'Order Not Found' });
        }
        res.status(200).json(order)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


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

    const { order_id, payment_id } = req.body;
    const razorpay_signature = req.headers['x-razorpay-signature'];

    const key_secret = RAZORPAY_KEY_SECRET;


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
        console.log("order", order, orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
        }


        // Check if the order has already been delivered
        if (order.deliveryStatus === 'Delivered') {
            res.status(400).json({ error: 'Cannot cancel a delivered order' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { deliveryStatus: 'Cancelled', isCancelled: true },
            { new: true }
        );

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//  GET-ORDER-REVENUE
exports.getorderRevenue = async (req, res) => {
    try {
        const orders = await Order.find()
        const monthlyIncome = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0
        };
        console.log("orders::::", orders);
        // Iterate through each order
        orders.forEach(order => {
            const totalAmount = order.totalAmount;
            const orderMonth = new Date(order.orderedDate).getMonth();

            switch (orderMonth) {
                case 0:
                    monthlyIncome.January += totalAmount;
                    break;
                case 1:
                    monthlyIncome.February += totalAmount;
                    break;
                case 2:
                    monthlyIncome.March += totalAmount;
                    break;
                case 3:
                    monthlyIncome.April += totalAmount;
                    break;
                case 4:
                    monthlyIncome.May += totalAmount;
                    break;
                case 5:
                    monthlyIncome.June += totalAmount;
                    break;
                case 6:
                    monthlyIncome.July += totalAmount;
                    break;
                case 7:
                    monthlyIncome.August += totalAmount;
                    break;
                case 8:
                    monthlyIncome.September += totalAmount;
                    break;
                case 9:
                    monthlyIncome.October += totalAmount;
                    break;
                case 10:
                    monthlyIncome.November += totalAmount;
                    break;
                case 11:
                    monthlyIncome.December += totalAmount;
                    break;
                default:
                    break;
            }
        });
        res.status(200).json(monthlyIncome);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ================================================================
// module.exports = { getTotalAmountByMonth };