const express=require("express")
const router = express.Router()

// const { Router } = require("express");
const userController=require("../controllers/admin/user")
const userinfo = require('../controllers/User/userinfo')




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
router.post("/add-address", userinfo.addShipmentAddress)
router.post("/update-address", userinfo.updateShipmentAddress)



module.exports=router