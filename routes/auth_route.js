const express = require('express')
const authController = require('../controllers/Auth/auth')
const router = express.Router()

router.post("/login", (req, res) => {
    console.log(req.body)
    authController.login(req.body).then(result => {
        res.status(result.statusCode).json(result)
        // console.log("helloooo",result.statusCode);
    })
})

module.exports = router 