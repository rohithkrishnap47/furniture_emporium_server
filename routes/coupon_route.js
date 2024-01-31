const express = require('express')
const router = express.Router()
const { verifyUser } = require('../middlewares/verifyUser');
const { createCoupon, deleteCoupon, getCouponById, getAllCoupons } = require('../controllers/admin/coupon');


// CREATE-COUPON
router.post('/create-coupon', createCoupon)
// DELETE-COUPON
router.delete('/delete-coupon/:id', deleteCoupon)
// GET-COUPON-ByID
router.get('/get-coupon/:id', verifyUser, getCouponById)
// GET-ALL-COUPON
router.get('/getALLcoupon', getAllCoupons)



module.exports = router