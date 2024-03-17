const express = require('express');
const router = express.Router();
const { addToCart, showCart, updateCart, removeCart } = require('../controllers/admin/cart');
const { verifyUser } = require('../middlewares/verifyUser'); // Your user verification middleware

// ADD-TO-CART
router.post('/addtocart', verifyUser, addToCart);

// SHOW-CART
router.get('/showcart', verifyUser, showCart);

// REMOVE-CART
router.delete('/removecart', verifyUser, removeCart);

module.exports = router;