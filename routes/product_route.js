const express = require('express');
const router = express.Router();
const productController = require('../controllers/admin/product');
const uploader = require("../services/multer")
const cloudinary = require("../services/cloudinary")

// Create a new product

router.post('/createProducts',async (req, res) => {
    try {
        const result = await productController.createProduct(req.body);
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a product by ID
router.put('/UpdateProducts', async (req, res) => {
    const productId = req.body.id;
    const updatedProductData = req.body;

    try {
        const result = await productController.updateProduct(productId, updatedProductData);
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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
