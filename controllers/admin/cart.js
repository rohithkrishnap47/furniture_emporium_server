const Cart = require("../../models/cartModels")
const User = require("../../models/authModal")

const { default: mongoose } = require("mongoose");
const Product = require("../../models/productModel");

// ADD-TO-CART
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        const pId = mongoose.Types.ObjectId(productId);

        if (!user) {
            return res.status(401).json({ message: "No user exists" });
        }

        // Fetch product details using productId
        const product = await Product.findById(pId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock === 0) {
            return res.status(400).json({ message: "Product Out of Stock" });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ customer: userId });

        if (!cart) {
            // If the user doesn't have a cart, create a new one
            cart = new Cart({
                customer: userId,
                totalQuantity: 0,
                totalPrice: 0,
                totalDiscountprice: 0,
                products: [],
            });
        }

        // Check if the product already exists in the cart
    
        const existingProductIndex = cart.products.findIndex((item) => {
            return item.productId.toString() === productId;
        });

        console.log("exisiting", existingProductIndex)



        if (existingProductIndex !== -1) {
            // If the product exists, update the quantity
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.products.push({
                productId: productId,
                quantity,
                price: product.price,
            });
        }

        // Update cart totals
        cart.totalQuantity += quantity;
        cart.totalPrice += product.price * quantity;
        cart.totalDiscountprice += product.discount * quantity;

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};






// Show-CART
const showCart = async (req, res) => {
    try {
        const userId = req.user._id
        const user = User.findById(userId)
        if (!user) {
            return res.status(401).json({ message: "No User Exists!!!" })
        }
        const cart = Cart.findById({ customer: userId }).populate("products.name")
        if (!cart) {
            return res.status(404).json({ message: "Cart not Found" })
        }
        const cartProducts = cart.products.map(product => ({
            name: product.name.name,
            quantity: product.quantity,
            price: product.price
        }));
        const response = {
            totalQuantity: cart.totalQuantity,
            totalPrice: cart.totalPrice,
            totalDiscountprice: cart.totalDiscountprice,
            cartProducts
        }
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// UPDATE-CART
const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "No user exists" });
        }
        const cart = await Cart.findOne({ customer: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
    }
    catch (error) {

    }
}
module.exports = { addToCart, showCart,updateCart }