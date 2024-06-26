const express = require('express')
const orderController = require('../controllers/User/order')
const router = express.Router()
const { verifyUser } = require('../middlewares/verifyUser');

// POST
router.post("/place-order", verifyUser, orderController.createOrder)
// ALL-ORDERS
router.get("/show-orders", orderController.getAllOrders)//verify user not needed here inorder to show in adminside
// USER-ORDERS
router.get("/user-orders", verifyUser, orderController.getuserOrder)
// USER-SINGLE-ORDER
router.get("/order/:orderId", orderController.getorderbyId)
// USER-ORDER-REVENUE
router.get("/user-orders-revenue", orderController.getorderRevenue)
// ORDER-CHART
router.get("/order-chart", orderController.getTotalAmountByMonth)
// ORDER-CHART-pie
router.get("/order-paymentmethod", orderController.generatePaymentMethodPieGraph)
// CANCEL-ORDER
router.post("/delete-order", orderController.cancelOrder)
// CHANGE-STATUS
router.patch("/update-order-status/:id", orderController.updateOrderStatus)
// VERIFY-USER
router.post("/verify-Order", orderController.verifyOrder)


module.exports = router