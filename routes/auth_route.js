const express = require('express')
const authController = require('../controllers/admin/authController')
const router = express.Router()

router.post("/login", (req, res) => {
    console.log(req.body)
    authController.loginUser(req.body).then(result => {
        res.status(result.statusCode).json(result)
        // console.log("helloooo",result.statusCode);
    })
})

router.post("/register", async (req, res) => {
    try {
        const result = await authController.registerUser(req.body); 
        res.status(result.statusCode).json(result); 
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
});


module.exports = router 