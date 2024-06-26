const express = require("express")
const router = express.Router()
// const { Router } = require("express");
const userController = require("../controllers/admin/user")
const userinfo = require('../controllers/User/userinfo')
const { verifyUser } = require('../middlewares/verifyUser'); // Your user verification middleware






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
router.get("/get-address", userinfo.getAddressById)

router.post("/submit-contact-form",userinfo.contactUs)

// router.get('/get-contacts', userinfo.getAllContacts);
// router.post('/add-contacts', userinfo.createContact);
// router.delete('/remove-contacts/:id', userinfo.deleteContact);


module.exports = router