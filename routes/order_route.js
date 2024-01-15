const express = require('express')
const orderController = require('../controllers/User/order')
const router = express.Router()
const { verifyUser } = require('../middlewares/verifyUser');

// POST
router.post("/place-order",verifyUser,orderController.createOrder)
// ALL-ORDERS
router.get("/show-orders",verifyUser,orderController.getAllOrders)
// CANCEL-ORDER
router.delete("/delete-order",verifyUser,orderController.cancelOrder)



module.exports = router