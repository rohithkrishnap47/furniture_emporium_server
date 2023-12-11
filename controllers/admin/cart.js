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
            // If the product exists, update(replace) the quantity

            cart.products[existingProductIndex].quantity = quantity;


        } else {
            // If the product doesn't exist, add it to the cart
            cart.products.push({
                productId: productId,
                quantity,
                price: product.price,
            });

        }





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
        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({ message: "No User Exists!!!" })
        }

        let cart = await Cart.findOne({ customer: userId }).populate("products.productId");
        // const cart = await Cart.findById({ customer: userId }).populate("products.name")
        console.log("productsform cart", cart.products[0].productId)
        if (!cart) {
            return res.status(404).json({ message: "Cart not Found" })
        }
        const cartProducts = cart.products?.map(product => ({
            _id: product.productId._id,
            name: product.productId.name,
            quantity: product.quantity,
            price: product.productId.price,
            images: product.productId.images
        }));

        // cart total calculations
        const cartTotalQuantity = cart.products?.reduce((prev, curr) => prev + curr.quantity, 0)
        const cartTotalPrice = cart.products?.reduce((prev, curr) => prev + (curr.productId.price * curr.quantity), 0)
        const cartTotalDiscount = cart.products?.reduce((prev, curr) => prev + (curr.productId.discount * curr.quantity), 0)

        const response = {
            totalQuantity: cartTotalQuantity,
            totalPrice: cartTotalPrice,
            totalDiscountprice: cartTotalDiscount,
            cartProducts
        }
        return res.status(200).json(response)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// REMOVE-CART
const removeCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "No user exists" });
        }

        const cart = await Cart.findOne({ customer: userId }).populate("products.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }





        const matchedProduct = cart.products.find((product) => product.productId._id.toString() === productId);
        if (!matchedProduct) {
            return res.status(404).json({ message: "Cart product not found" });
        }
        console.log("adffsf", matchedProduct, cart);

        const updatedQuantity = Number(cart.totalQuantity) - Number(matchedProduct.quantity);
        const updatedTotalPrice = cart.totalPrice - (matchedProduct.productId.price * matchedProduct.quantity);
        console.log("updatedQuan", updatedQuantity, typeof updatedQuantity, cart.totalQuantity, matchedProduct.quantity);

        const updatedTotalDiscount = cart.totalDiscountprice - (matchedProduct.productId.discount * matchedProduct.quantity);
        const updatedProducts = cart.products.filter((product) => product.productId._id.toString() !== productId);


        const updatedCart = {
            customer: userId,
            totalQuantity: updatedQuantity,
            totalPrice: updatedTotalPrice,
            totalDiscountprice: updatedTotalDiscount,
            products: updatedProducts,
        }
        const savedCart = await Cart.findOneAndUpdate({ customer: userId }, updatedCart, { new: true });

        return res.status(200).json({ message: "Cart updated successfully", updateCart: savedCart });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = { addToCart, showCart, removeCart }