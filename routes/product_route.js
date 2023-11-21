const express = require('express');
const router = express.Router();
const productController = require('../controllers/admin/product');
const uploader = require("../services/multer")
const cloudinary = require("../services/cloudinary")
const {check}=require("express-validator")
const productCreateValidator = [
    check("name").notEmpty(),
    check("category").notEmpty(),
    check("warranty").notEmpty(),
    check("price").notEmpty(),
    check("discount").notEmpty(),
    check("stock").notEmpty(),
]
// Create a new product

router.post('/createProducts',uploader.single("file"), productCreateValidator,productController.createProduct);

// Update a product by ID
router.put('/UpdateProducts/:id',uploader.single("file"), productController.updateProduct);
// router.put('/UpdateProducts/:id', (req, res) => productController.updateProduct(req,res))

// Get a product by ID
router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await productController.getProductById(productId);
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all products
router.get('/productsAll', async (req, res) => {
    try {
        const result = await productController.getAllProducts();
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await productController.deleteProduct(productId);
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// product file upload


router.post('/upload-products',uploader.single("file"), async (req, res) => {
    try {
        console.log("req",req.file)
        const upload = await cloudinary.uploader.upload(req.file.path,{ resource_type: "raw" });
        return res.json({
          success: true,
          file: upload.secure_url,
        });
    } catch (error) {
      console.log(error)
    }
});


module.exports = router 
