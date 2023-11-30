const express = require('express')
const authController = require('../controllers/admin/authController')
const router = express.Router()

router.post("/login", authController.loginUser)

router.post("/register", authController.registerUser);

router.post("/forgotpassword",authController.forgotpassword)

router.post("/resetpassword",authController.resetPassword)

router.post("/otpverification",authController.otpverification)

// admin-login-route
router.post("/adminlogin",authController.loginAdmin)

module.exports = router 

