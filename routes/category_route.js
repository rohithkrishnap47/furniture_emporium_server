const express = require('express');
const router = express.Router();
const uploader = require("../services/multer")
const cloudinary = require("../services/cloudinary")
const categoryController = require('../controllers/admin/categories');
const { body, query, validationResult } = require("express-validator")


// Category_ROUTE

// CREATE

const createValidator = [
    body("categoryName").notEmpty(),
    body("description").notEmpty(),
    body("categoryImages").notEmpty(),
]

router.post('/createCategory', uploader.single("file"), categoryController.createcategory);

router.put("/updatecategory/:id", uploader.single("file"), categoryController.updatecategory);

// router.post("/createCategory", createValidator, (req, res) => {
//     const error = validationResult(req)
//     if (!error.isEmpty()) {
//         return res.status(400).json({
//             statusCode: 400,
//             message: "Invalid inputs have been provided",
//             data: error.array(),
//         });
//     }
//     console.log(req.body)
//     // const reqBody=req.body
//     categoryController.createcategory(req.body).then(result => {
//         console.log(result);
//         res.status(result.statusCode).json(result)
//     })

// })
// Update 
router.put("/updatecategory/:id", (req, res) => {
    const productId = req.params.id;
    const updateddata = req.body;
    categoryController.updatecategory(productId, updateddata).then(result => {
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


// GET-CATEGORY-BY-PRODUCT
// router.get("/category-by-product",categoryController.getProductsByCategory)
// router.get("/category-by-product", categoryController.getProductsByCategory, (req, res, next) => {
//     // Your existing middleware functions (if any)

//     // Add your console.log statement here, specifying what you want to log
//     console.log("harrrrrrrrrrrrrrrrrrrrrr");

//     // Call the categoryController.getProductsByCategory function and handle its response
//     next(); // Assuming you have middleware to handle the response
// });

module.exports = router