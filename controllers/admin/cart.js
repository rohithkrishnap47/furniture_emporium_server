const Cart = require("../../models/cartModel")
const User = require("../../models/authModal")

// ADD-TO-CART
const addToCart = async (req, res) => {
    try {
        const { customer, totalQuantity, totalPrice, totalDiscountprice } = req.body
        const userId = req.body._id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "no user exist " })
        }
        const newCart = new Cart({
            customer,
            totalQuantity,
            totalPrice,
            totalDiscountprice
        })
        await newCart.save();
        return res.status(200).json({ message: "Cart created successfully" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

// Show-CART


module.exports = { addToCart }