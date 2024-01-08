const express = require("express")
const router = express.Router()
// const { Router } = require("express");
const userController = require("../controllers/admin/user")
const userinfo = require('../controllers/User/userinfo')
const { verifyUser } = require('../middlewares/verifyUser'); // Your user verification middleware




// router.post("/register", (req, res) => {
//     userController.registerUser(req.body).then(result => {
//         res.status(result.statusCode).json(result)
//     })
// })

router.get("/getuser/:id", (req, res) => {
    const userId = req.params.id;
    userController.getUserbyId(userId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

// get all users
router.get("/listusers", (req, res) => {
    userController.getAllUsers().then(result => {
        res.status(result.statusCode).json(result);
    }).catch(error => {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    });
});


// -----------------------------------------------------
// ADD-SHIPMENT-ADDRESS
router.post("/add-address", verifyUser, userinfo.addShipmentAddress)
// UPDATE-SHIPMENT-ADDRESS
router.post("/update-address", verifyUser, userinfo.updateShipmentAddress)
// GET-USER-BY-ID
router.get("/get-address",  userinfo.getAddressById)



module.exports = router