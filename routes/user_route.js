const express=require("express")
const router = express.Router()

// const { Router } = require("express");
const userController=require("../controllers/admin/user")



router.post("/register", (req, res) => {
    userController.registerUser(req.body).then(result => {
        res.status(result.statusCode).json(result)
    })
})

router.get("/getuser/:id", (req, res) => {
    const userId = req.params.id;
    userController.getUserbyId(userId).then(result => {
        res.status(result.statusCode).json(result);
    });
});


// router.post("/")
module.exports=router