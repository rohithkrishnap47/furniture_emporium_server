const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/admin/categories');
const {body, query, validationResult} = require("express-validator")


// Category_ROUTE

// CREATE

const createValidator = [
    body("categoryName").notEmpty(),
    body("description").notEmpty(),
]

router.post("/createCategory",createValidator,  (req, res) => {
    const error = validationResult(req) 
    if (!error.isEmpty()) {
        return res.status(400).json({
            statusCode: 400,
            message: "Invalid inputs have been provided",
            data: error.array(),
        });
    }
    console.log(req.body)
    // const reqBody=req.body
    categoryController.createcategory(req.body).then(result => {
        console.log(result);
        res.status(result.statusCode).json(result)
    })

})
// Update 
router.put("/updatecategory/:id",(req,res)=>{
    const productId= req.params.id;
    const updateddata= req.body;
    categoryController.updatecategory(productId,updateddata).then(result => {
        res.status(result.statusCode).json(result)
    })
    
})
// GET
router.get("/category/:id", (req, res) => {
    const productId = req.params.id;

    categoryController.getcategoryById(productId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

router.get("/categoryAll", (req, res) => {
    // const productId = req.params;

    categoryController.getAllcategorys().then(result => {
        res.status(result.statusCode).json(result);
    });
});

// DELETE
router.delete("/deletecategory/:id", (req, res) => {
    const productId = req.params.id;

    categoryController.deletecategory(productId).then(result => {
        res.status(result.statusCode).json(result);
    });
});


module.exports = router 