const express = require('express')
const authController = require('../controllers/admin/authController')
const router = express.Router()
const { verifyUser } = require('../middlewares/verifyUser');

router.post("/login", authController.loginUser)

router.post("/register", authController.registerUser);

router.post("/forgotpassword", authController.forgotpassword)

router.post("/resetpassword", authController.resetPassword)

router.post("/otpverification", authController.otpverification)

router.get("/getuserbyid", verifyUser, authController.getUserById)//get user by id

// admin-login-route
router.post("/adminlogin", authController.loginAdmin)

// super-admin-register
router.post("/superadminsignup", authController.registerSuperAdmin)

// super-admin-register
router.post("/superadminlogin", authController.loginSuperAdmin)

module.exports = router

