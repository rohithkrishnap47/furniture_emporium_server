const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/admin/banner');

// Create Banner
router.post("/createBanner", (req, res) => {
    bannerController.createBanner(req.body).then(result => {
        res.status(result.statusCode).json(result);
    });
});

// Update Banner
router.put("/updateBanner/:id", (req, res) => {
    const bannerId = req.params.id;
    const updatedData = req.body;
    bannerController.updateBanner(bannerId, updatedData).then(result => {
        res.status(result.statusCode).json(result);
    });
});

// Get Banner by ID
router.get("/getBanner/:id", (req, res) => {
    const bannerId = req.params.id;
    bannerController.getBannerById(bannerId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

// Get All Banners
router.get("/getAllBanners", (req, res) => {
    bannerController.getAllBanners().then(result => {
        res.status(result.statusCode).json(result);
    });
});

// Delete Banner
router.delete("/deleteBanner/:id", (req, res) => {
    const bannerId = req.params.id;
    bannerController.deleteBanner(bannerId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

module.exports = router;
