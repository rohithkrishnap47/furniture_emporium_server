const Coupon = require("../../models/couponModel")

// CREATE-COUPON
const createCoupon = async (req, res) => {
    try {
        const { code, discount, validFrom, validTo } = req.body;

        // Validate input data
        if (!code || !discount || !validFrom || !validTo) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new coupon instance
        const newCoupon = new Coupon({
            code,
            discount,
            validFrom,
            validTo,
        });

        // Save the coupon to the database
        await newCoupon.save();

        res.status(201).json({ message: 'Coupon created successfully.', coupon: newCoupon });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE-COUPON
const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate coupon ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid coupon ID.' });
        }

        // Find and delete the coupon by ID
        const deletedCoupon = await Coupon.findByIdAndDelete(id);

        if (!deletedCoupon) {
            return res.status(404).json({ message: 'Coupon not found.' });
        }

        res.status(200).json({ message: 'Coupon deleted successfully.', deletedCoupon });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET-COUPON-ByID
const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate coupon ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid coupon ID.' });
        }

        // Find the coupon by ID
        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found.' });
        }

        res.status(200).json({ coupon });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllCoupons = async (req, res) => {
    try {
        console.log("hi");
        // Retrieve all coupons from the database
        const coupons = await Coupon.find();
        console.log(coupons);
        res.status(200).json({ coupons });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// EXPORTS-FUN
module.exports = {
    deleteCoupon,
    createCoupon,
    getCouponById,
    getAllCoupons
};